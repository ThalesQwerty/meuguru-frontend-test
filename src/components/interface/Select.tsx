import React from "react";

interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {}

export function Select({ children, ...inputProps }: SelectProps) {
  return (
    <>
      <select className="select" {...inputProps}>
        {children}
      </select>
    </>
  );
}
