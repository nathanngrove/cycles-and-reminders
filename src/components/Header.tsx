import getUser from "@/lib/getUser";
import Link from "next/link";
import React from "react";
import ProfileDropDownMenu from "./ProfileDropDownMenu";
import LoginButton from "./LoginButton";
import { deleteSession } from "@/lib/session";

async function Header() {
	const user = await getUser();

	return (
		<header className="flex justify-between items-center py-8">
			<Link href="/" className="font-bold text-xl">
				Cycles and Reminders
			</Link>
			{user ? (
				<ProfileDropDownMenu {...user} deleteSession={deleteSession} />
			) : (
				<LoginButton />
			)}
		</header>
	);
}

export default Header;
