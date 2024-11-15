"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";

type ProfileDropDownMenuProps = {
	username: string;
	deleteSession: () => Promise<void>;
};

function ProfileDropDownMenu({
	username,
	deleteSession,
}: ProfileDropDownMenuProps) {
	const popover = useRef<HTMLUListElement>(null);

	return (
		<div>
			<div className="relative">
				<button
					popoverTarget="popover"
					className="size-[50px] bg-white rounded-full grid place-items-center text-black font-bold text-2xl cursor-pointer">
					{username.charAt(0).toUpperCase()}
				</button>
				<ul
					ref={popover}
					popover="auto"
					id="popover"
					className="left-[80%] translate-x-[-60%] top-24 bg-neutral-700 rounded-md text-white">
					<li className="w-full hover:bg-neutral-600 rounded-md cursor-pointer text-center">
						<Link
							className="px-12 leading-[2.5rem]"
							href="/"
							onClick={() => popover.current?.hidePopover()}>
							Profile
						</Link>
					</li>
					<li className="w-full  hover:bg-neutral-600 rounded-md cursor-pointer text-center">
						<Link
							className="px-12 leading-[2.5rem]"
							href="/dashboard"
							onClick={() => popover.current?.hidePopover()}>
							Dashboard
						</Link>
					</li>
					<li>
						<button
							className="w-full h-full py-2 px-12 hover:bg-neutral-600 rounded-md"
							onClick={async () => {
								popover.current?.hidePopover();
								await deleteSession();
							}}>
							Logout
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default ProfileDropDownMenu;
