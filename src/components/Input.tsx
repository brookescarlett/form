import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

function Input({ className, placeholder, error, ...rest }: InputProps) {
  return (
    <>
      <label
        htmlFor={`input-${placeholder}`}
        id={`label-for-${placeholder}`}
        className="visually-hidden"
      >
        {placeholder}
      </label>
      {error && (
        <div data-testid="error-message" className="error-message">
          {error}
        </div>
      )}
      <input
        {...rest}
        id={`input-${placeholder}`}
        aria-labelledby={`label-for-${placeholder}`}
        className={`${className} input ${error && "input-error"}`}
        placeholder={placeholder}
      />
    </>
  );
}

Input.displayName = "Input";

export default Input;
