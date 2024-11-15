import React, { useContext } from "react";
import { PopoverContext } from "./DropDownContext";

type DropDownMenuProps = {
	children: React.ReactNode;
	name: string;
	className?: string;
};

function DropDownMenu({ children, name, className }: DropDownMenuProps) {
	const popover = useContext(PopoverContext);

	return (
		<ul ref={popover} popover="auto" id={name} className={className}>
			{children}
		</ul>
	);
}

export default DropDownMenu;
