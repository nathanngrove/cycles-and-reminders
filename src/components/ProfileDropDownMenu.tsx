"use client";
import Link from "next/link";
import React, { useState } from "react";

type ProfileDropDownMenuProps = {
	username: string;
	deleteSession: () => Promise<void>;
};

function ProfileDropDownMenu({
	username,
	deleteSession,
}: ProfileDropDownMenuProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<div className="relative">
				<button
					className="size-[50px] bg-white rounded-full grid place-items-center text-black font-bold text-2xl cursor-pointer"
					onClick={() => {
						setIsOpen((prevState) => !prevState);
					}}>
					{username.charAt(0).toUpperCase()}
				</button>
				{isOpen ? (
					<ul className="absolute right-0 bg-neutral-700 rounded-md mt-1">
						<li className="w-full py-2 px-12 hover:bg-neutral-600 rounded-md cursor-pointer text-center">
							<Link href="/">Profile</Link>
						</li>
						<li className="w-full py-2 px-12 hover:bg-neutral-600 rounded-md cursor-pointer text-center">
							<Link href="/dashboard">Dashboard</Link>
						</li>
						<li>
							<button
								className="w-full h-full py-2 px-12 hover:bg-neutral-600 rounded-md"
								onClick={async () => {
									await deleteSession();
								}}>
								Logout
							</button>
						</li>
					</ul>
				) : null}
			</div>
		</div>
	);
}

export default ProfileDropDownMenu;
