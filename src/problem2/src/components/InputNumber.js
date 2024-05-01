import React from "react";

export default function InputNumber({
  errorMessage,
  className,
  name,
  register,
  rules,
  onChange,
  classNameInput = "p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm",
  classNameError = "mt-1 text-red-600 min-h-[1.25rem] text-sm",
  ...rest
}) {
  const registerResult = register && name ? register(name, rules) : null;
  return (
    <div className={"relative " + className}>
      <input
        className={classNameInput}
        {...registerResult}
        {...rest}
        onChange={(event) => onChange(event.target.value, name)}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  );
}
