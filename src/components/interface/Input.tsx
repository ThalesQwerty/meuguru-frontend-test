import React from "react";

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

}

export function Input({ ...inputProps }: InputProps) {
    return <>
        <input className="input" {...inputProps} placeholder="Pesquisar..." />
    </>
}