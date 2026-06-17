import React from "react";

export default function InputField({
  id,
  label,
  value,
  onChange,
  onBlur,
  type = "number",
  placeholder,
  required = false,
  error,
  icon,
}) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="mt-1 relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <span className="text-slate-400">{icon}</span>
          </div>
        )}
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`block w-full rounded-md border bg-white px-3 py-2 placeholder-slate-400 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out sm:text-sm ${
            icon ? "pl-10" : ""
          } ${error ? "border-red-300" : "border-slate-200"}`}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
