import Link from "next/link";
import React, { useContext } from "react";
import { PopoverContext } from "./DropDownContext";
import { twMerge } from "tailwind-merge";

type DropDownLinkProps = {
	children: React.ReactNode;
	href: string;
	className?: string;
};

function DropDownLink({ children, href, className }: DropDownLinkProps) {
	const popover = useContext(PopoverContext);

	return (
		<li
			className={twMerge(
				"w-full h-full cursor-pointer text-center",
				className
			)}>
			<Link
				className={"w-full h-full py-2 inline-block"}
				href={href}
				onClick={() => popover?.current?.hidePopover()}>
				{children}
			</Link>
		</li>
	);
}

type DropDownButtonProps = {
	children: React.ReactNode;
	onClick: () => void;
	className?: string;
};

function DropDownButton({ children, onClick, className }: DropDownButtonProps) {
	const popover = useContext(PopoverContext);

	return (
		<li>
			<button
				className={twMerge("w-full h-full py-2 px-12", className)}
				onClick={() => {
					popover?.current?.hidePopover();
					onClick();
				}}>
				{children}
			</button>
		</li>
	);
}

export { DropDownLink, DropDownButton };
