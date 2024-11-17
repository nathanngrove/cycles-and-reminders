import getUser from "@/lib/getUser";
import Link from "next/link";
import React from "react";
import ProfileDropDownMenu from "./ProfileDropDownMenu";
import { deleteSession } from "@/lib/session";
import ButtonLink from "./ButtonLink";

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
				<ButtonLink linkTo="/login">Log in</ButtonLink>
			)}
		</header>
	);
}

export default Header;
