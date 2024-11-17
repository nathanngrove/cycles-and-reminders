import React, { createContext, RefObject, useRef } from "react";

type PopoverContextProps = {
	children: React.ReactNode;
};

export const PopoverContext = createContext<RefObject<HTMLUListElement> | null>(
	null
);

function PopoverContextProvider({ children }: PopoverContextProps) {
	const popover = useRef<HTMLUListElement>(null);

	return (
		<PopoverContext.Provider value={popover}>
			{children}
		</PopoverContext.Provider>
	);
}

export default PopoverContextProvider;
