import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function InputField({
  label,
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  name,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
        </label>
      )}

      <div className="input-container">

        {Icon && (
          <span className="input-icon">
            <Icon size={20} strokeWidth={2}/>
          </span>
        )}

        <input
          className="form-input"
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          name={name}
          autoComplete="off"
        />

        {type === "password" && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff size={20} strokeWidth={2}/>
            ) : (
              <Eye size={20} strokeWidth={2}/>
            )}
          </button>
        )}

      </div>
    </div>
  );
}

export default InputField;