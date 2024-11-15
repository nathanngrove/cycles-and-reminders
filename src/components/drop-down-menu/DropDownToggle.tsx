import React from "react";
import { twMerge } from "tailwind-merge";

type DropDownToggleProps = {
	children: React.ReactNode;
	targetName: string;
	className?: string;
};

function DropDownToggle({
	children,
	targetName,
	className,
}: DropDownToggleProps) {
	return (
		<button
			popoverTarget={targetName}
			className={twMerge(
				"grid place-items-center cursor-pointer",
				className
			)}>
			{children}
		</button>
	);
}

export default DropDownToggle;
