import React from "react";

export default function Select({
  errorMessage,
  className,
  name,
  register,
  options,
  rules,
  classNameSelect = "text-gray-400 p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm",
  classNameError = "mt-1 text-red-600 min-h-[1.25rem] text-sm",
  ...rest
}) {
  const registerResult = register && name ? register(name, rules) : null;
  return (
    <div className={"relative " + className}>
      <select {...registerResult} className={classNameSelect}>
        <option selected value="">
          Choose currency to send
        </option>
        {options?.map((item) => {
          return <option value={item}>{item}</option>;
        })}
      </select>
      <div className={classNameError}>{errorMessage}</div>
    </div>
  );
}
