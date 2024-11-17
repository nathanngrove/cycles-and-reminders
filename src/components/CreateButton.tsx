"use client";

import React from "react";
import Link from "next/link";

function CreateButton() {
	return (
		<Link
			href="/create-reminder"
			className="text-lg border-2 border-white text-white rounded-full p-2 hover:text-black hover:bg-white">
			Create +
		</Link>
	);
}

export default CreateButton;
