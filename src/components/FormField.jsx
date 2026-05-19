const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
}) => {
  return (
    <label className="auth-field">
      <span>{label}</span>
      <input
        className="auth-input"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
      />
    </label>
  )
}

export default FormField
