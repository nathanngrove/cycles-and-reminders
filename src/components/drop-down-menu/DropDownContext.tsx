import React, { createContext, RefObject, useRef } from "react";

type DropDownContextProps = {
	children: React.ReactNode;
};

export const PopoverContext = createContext<RefObject<HTMLUListElement> | null>(
	null
);

function DropDownContext({ children }: DropDownContextProps) {
	const popover = useRef<HTMLUListElement>(null);

	return (
		<PopoverContext.Provider value={popover}>
			{children}
		</PopoverContext.Provider>
	);
}

export default DropDownContext;
