import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

export const approveDoctor = httpsCallable(functions, "approveDoctor");
export const rejectDoctor = httpsCallable(functions, "rejectDoctor");
export const disableUser = httpsCallable(functions, "disableUser");
export const removePost = httpsCallable(functions, "removePost");
export const resolveReport = httpsCallable(functions, "resolveReport");
