import React from "react";
import DropDownContext from "./drop-down-menu/DropDownContext";
import DropDownToggle from "./drop-down-menu/DropDownToggle";
import DropDownMenu from "./drop-down-menu/DropDownMenu";
import { DropDownButton, DropDownLink } from "./drop-down-menu/DropDownOptions";

function CreateButton() {
	return (
		<DropDownContext>
			<DropDownToggle
				targetName="create"
				className="text-lg border-2 border-white text-white rounded-full px-2 hover:text-black hover:bg-white">
				Create +
			</DropDownToggle>
			<DropDownMenu
				name="create"
				className="rounded-md text-white text-3xl w-[50%] bg-neutral-800 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
				<DropDownLink
					href="/create-reminder"
					className="hover:bg-neutral-700 rounded-full border-2 border-transparent hover:border-white">
					Reminder
				</DropDownLink>
				<DropDownLink
					href="/dashboard"
					className="hover:bg-neutral-600">
					Cycle
				</DropDownLink>
			</DropDownMenu>
		</DropDownContext>
	);
}

export default CreateButton;
