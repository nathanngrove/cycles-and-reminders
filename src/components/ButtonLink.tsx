import Link from "next/link";
import React from "react";

type ButtonLinkProps = {
	linkTo: string;
	children: React.ReactNode;
};

const ButtonLink = ({ linkTo, children }: ButtonLinkProps) => {
	return (
		<Link
			href={linkTo}
			className="px-4 py-2 bg-green-500 text-white font-bold rounded-sm hover:bg-green-600">
			{children}
		</Link>
	);
};

export default ButtonLink;
