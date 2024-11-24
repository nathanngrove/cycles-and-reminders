"use client";
import React, { useState } from "react";

type TileProps = {
	name: string;
	frequency: number;
	id: number;
	startReminder: (id: number) => Promise<{
		code: string;
		message: string;
	}>;
};

function Tile({ name, frequency, startReminder, id }: TileProps) {
	const [res, setRes] = useState<{
		code: string;
		message: string;
	} | null>(null);

	async function start() {
		const updated = await startReminder(id);
		setRes(updated);
	}

	return (
		<div className="flex flex-col bg-neutral-700 aspect-video p-4 rounded-md lg:text-lg md:text-xl text-2xl">
			<p className="flex-grow">{name}</p>
			<div className="flex items-center">
				<p className="flex-grow">{frequency} minutes</p>
				<button
					className="text-neutral-200 hover:text-neutral-400"
					onClick={async () => await start()}>
					▶
				</button>
			</div>
			{res === null ? null : res.message}
		</div>
	);
}

export default Tile;
