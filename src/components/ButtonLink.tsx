import Link from "next/link";
import React from "react";

type ButtonLinkProps = {
	linkTo: string;
	label: string;
};

const ButtonLink = ({ linkTo, label }: ButtonLinkProps) => {
	return (
		<Link
			href={linkTo}
			className="px-2 py-1 bg-green-500 text-white font-bold rounded-sm hover:bg-green-600">
			{label}
		</Link>
	);
};

export default ButtonLink;
