"use client";

import React from "react";
import DropDownContext from "./drop-down-menu/DropDownContext";
import DropDownToggle from "./drop-down-menu/DropDownToggle";
import DropDownMenu from "./drop-down-menu/DropDownMenu";
import { DropDownButton, DropDownLink } from "./drop-down-menu/DropDownOptions";

type ProfileDropDownMenuProps = {
	username: string;
	deleteSession: () => Promise<void>;
};

function ProfileDropDownMenu({
	username,
	deleteSession,
}: ProfileDropDownMenuProps) {
	return (
		<DropDownContext>
			<DropDownToggle
				targetName="profile-dropdown"
				className="size-[50px] bg-white rounded-full text-black font-bold text-2xl">
				{username.charAt(0).toUpperCase()}
			</DropDownToggle>
			<DropDownMenu
				name="profile-dropdown"
				className="rounded-md text-white bg-neutral-700 left-[80%] translate-x-[-60%] top-24">
				<DropDownLink href="/" className="hover:bg-neutral-600">
					Profile
				</DropDownLink>
				<DropDownLink
					href="/dashboard"
					className="hover:bg-neutral-600">
					Dashboard
				</DropDownLink>
				<DropDownButton
					className="hover:bg-neutral-600 rounded-md"
					onClick={async () => {
						await deleteSession();
					}}>
					Logout
				</DropDownButton>
			</DropDownMenu>
		</DropDownContext>
	);
}

export default ProfileDropDownMenu;
