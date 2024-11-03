import Link from "next/link";
import React from "react";

function Header() {
	return (
		<header className="flex justify-between items-center py-8">
			<Link href="/" className="font-bold text-xl">
				Cycles and Reminders
			</Link>
			<div className="size-[50px] bg-white rounded-full"></div>
		</header>
	);
}

export default Header;
