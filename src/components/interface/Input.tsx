import React from "react";

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

}

export function Input({ ...inputProps }: InputProps) {
    return <>
        <input className="border-2 border-gray-300 bg-white px-2 rounded-md text-gray-600 focus:border-purple-600" {...inputProps} />
    </>
}