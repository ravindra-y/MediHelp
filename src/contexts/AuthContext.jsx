import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  getIdToken,
  getIdTokenResult,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { auth, db, storage } from '../firebase'

const AuthContext = createContext(null)
const tokenStorageKey = 'medihelp_auth_token'

const parseJwt = (token) => {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(atob(base64))
    return payload
  } catch {
    return null
  }
}

const buildUserProfile = (user) => ({
  uid: user.uid,
  email: user.email ?? null,
  displayName: user.displayName ?? null,
  photoURL: user.photoURL ?? null,
  role: 'patient',
  doctorStatus: 'none',
  providerIds: user.providerData.map((provider) => provider.providerId),
  createdAt: serverTimestamp(),
  lastLoginAt: serverTimestamp(),
})

const ensureUserProfile = async (user) => {
  const userRef = doc(db, 'users', user.uid)
  const snapshot = await getDoc(userRef)
  if (!snapshot.exists()) {
    await setDoc(userRef, buildUserProfile(user))
  } else {
    await updateDoc(userRef, {
      lastLoginAt: serverTimestamp(),
      displayName: user.displayName ?? snapshot.data().displayName ?? null,
      photoURL: user.photoURL ?? snapshot.data().photoURL ?? null,
      providerIds: user.providerData.map((provider) => provider.providerId),
    })
  }
  return userRef
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [claims, setClaims] = useState({})
  const [role, setRole] = useState('guest')
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(() => null)
  }, [])

  useEffect(() => {
    let detachProfile = null
    const detachAuth = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (detachProfile) {
          detachProfile()
          detachProfile = null
        }
        if (!currentUser) {
          setUser(null)
          setProfile(null)
          setClaims({})
          setRole('guest')
          setToken(null)
          localStorage.removeItem(tokenStorageKey)
          setLoading(false)
          return
        }

        setUser(currentUser)
        const userRef = await ensureUserProfile(currentUser)
        detachProfile = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setProfile(snapshot.data())
          }
        })

        const tokenResult = await getIdTokenResult(currentUser, true)
        setClaims(tokenResult.claims)
        const explicitRole = tokenResult.claims.role
        const activeRole = explicitRole
          ? explicitRole
          : tokenResult.claims.admin
            ? 'admin'
            : tokenResult.claims.doctor
              ? 'doctor'
              : 'patient'

        setRole(activeRole)

        const freshToken = await getIdToken(currentUser)
        setToken(freshToken)
        localStorage.setItem(tokenStorageKey, freshToken)
        setLoading(false)
      } catch {
        setLoading(false)
      }
    })

    return () => {
      if (detachProfile) detachProfile()
      detachAuth()
    }
  }, [])

  const refreshToken = useCallback(async () => {
    if (!auth.currentUser) return null
    const tokenResult = await getIdTokenResult(auth.currentUser, true)
    setClaims(tokenResult.claims)
    const nextToken = await getIdToken(auth.currentUser, true)
    setToken(nextToken)
    localStorage.setItem(tokenStorageKey, nextToken)
    return nextToken
  }, [])

  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }, [])

  const signInWithEmail = useCallback(async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }, [])

  const registerWithEmail = useCallback(async ({ name, email, password }) => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
    if (name) {
      await updateProfile(credential.user, { displayName: name })
    }
    await ensureUserProfile(credential.user)
    return credential
  }, [])

  const signOutUser = useCallback(async () => {
    await signOut(auth)
  }, [])

  const applyDoctorVerification = useCallback(
    async ({
      degreeFile,
      licenseNumber,
      specialization,
      experienceYears,
      hospitalAffiliation,
    }) => {
      if (!auth.currentUser) throw new Error('Not authenticated')
      const applicantId = auth.currentUser.uid
      let degreeUrl = null

      if (degreeFile) {
        const fileRef = ref(
          storage,
          `doctor-certificates/${applicantId}/${degreeFile.name}`,
        )
        await uploadBytes(fileRef, degreeFile)
        degreeUrl = await getDownloadURL(fileRef)
      }

      const applicationRef = doc(db, 'doctorApplications', applicantId)
      await setDoc(
        applicationRef,
        {
          uid: applicantId,
          degreeUrl,
          licenseNumber,
          specialization,
          experienceYears: Number(experienceYears || 0),
          hospitalAffiliation,
          status: 'pending',
          submittedAt: serverTimestamp(),
        },
        { merge: true },
      )

      const userRef = doc(db, 'users', applicantId)
      await updateDoc(userRef, {
        doctorStatus: 'pending',
        specialization,
        licenseNumber,
        hospitalAffiliation,
        experienceYears: Number(experienceYears || 0),
      })

      return applicationRef
    },
    [],
  )

  const value = useMemo(
    () => ({
      user,
      profile,
      claims,
      role,
      token,
      loading,
      signInWithGoogle,
      signInWithEmail,
      registerWithEmail,
      signOutUser,
      refreshToken,
      applyDoctorVerification,
      tokenStorageKey,
      tokenPayload: parseJwt(token),
    }),
    [
      user,
      profile,
      claims,
      role,
      token,
      loading,
      signInWithGoogle,
      signInWithEmail,
      registerWithEmail,
      signOutUser,
      refreshToken,
      applyDoctorVerification,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
