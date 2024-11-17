import React, { useContext } from "react";
import { PopoverContext } from "./PopoverContext";

type PopoverMenuProps = {
	children: React.ReactNode;
	name: string;
	className?: string;
};

function PopoverMenu({ children, name, className }: PopoverMenuProps) {
	const popover = useContext(PopoverContext);

	return (
		<ul ref={popover} popover="auto" id={name} className={className}>
			{children}
		</ul>
	);
}

export default PopoverMenu;
