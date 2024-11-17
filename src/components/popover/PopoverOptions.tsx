import Link from "next/link";
import React, { useContext } from "react";
import { PopoverContext } from "./PopoverContext";
import { twMerge } from "tailwind-merge";

type PopoverLinkProps = {
	children: React.ReactNode;
	href: string;
	className?: string;
};

function PopoverLink({ children, href, className }: PopoverLinkProps) {
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

type PopoverButtonProps = {
	children: React.ReactNode;
	onClick: () => void;
	className?: string;
};

function PopoverButton({ children, onClick, className }: PopoverButtonProps) {
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

export { PopoverLink, PopoverButton };
