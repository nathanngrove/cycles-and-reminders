import React from "react";
import { twMerge } from "tailwind-merge";

type PopoverToggleProps = {
	children: React.ReactNode;
	targetName: string;
	className?: string;
};

function PopoverToggle({
	children,
	targetName,
	className,
}: PopoverToggleProps) {
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

export default PopoverToggle;
