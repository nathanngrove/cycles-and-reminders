"use client";

import React from "react";
import PopoverToggle from "./popover/PopoverToggle";
import PopoverMenu from "./popover/PopoverMenu";
import { PopoverButton, PopoverLink } from "./popover/PopoverOptions";
import PopoverContextProvider from "./popover/PopoverContext";

type ProfileDropDownMenuProps = {
	username: string;
	deleteSession: () => Promise<void>;
};

function ProfileDropDownMenu({
	username,
	deleteSession,
}: ProfileDropDownMenuProps) {
	return (
		<PopoverContextProvider>
			<PopoverToggle
				targetName="profile-dropdown"
				className="size-[50px] bg-white rounded-full text-black font-bold text-2xl">
				{username.charAt(0).toUpperCase()}
			</PopoverToggle>
			<PopoverMenu
				name="profile-dropdown"
				className="text-white bg-neutral-700 left-[90%] translate-x-[-50%] top-24 rounded-md">
				<PopoverLink href="/" className="hover:bg-neutral-600">
					Profile
				</PopoverLink>
				<PopoverLink href="/dashboard" className="hover:bg-neutral-600">
					Dashboard
				</PopoverLink>
				<PopoverButton
					className="hover:bg-neutral-600"
					onClick={async () => {
						await deleteSession();
					}}>
					Logout
				</PopoverButton>
			</PopoverMenu>
		</PopoverContextProvider>
	);
}

export default ProfileDropDownMenu;
