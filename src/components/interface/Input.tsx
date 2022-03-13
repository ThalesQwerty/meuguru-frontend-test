import React from "react";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export function Input({ className, ...inputProps }: InputProps) {
  return (
    <>
      <input
        className={`input ${className ?? ""}`}
        {...inputProps}
        placeholder="Pesquisar..."
      />
    </>
  );
}
