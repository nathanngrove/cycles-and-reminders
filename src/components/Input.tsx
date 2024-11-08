import React from "react";

type InputProps = {
	label: string;
	type: string;
	name: string;
};

function Input({ label, type, name }: InputProps) {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				name={name}
				id={name}
				className="p-2 rounded-sm bg-gray-700 focus:outline-gray-900"
			/>
		</div>
	);
}

export default Input;
