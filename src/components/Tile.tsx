"use client";
import React, { useContext, useState } from "react";
import { NotificationQueueContext } from "./notifications/NotificationQueueContext";

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
	const { queue, addNotificationToQueue } = useContext(
		NotificationQueueContext
	);

	const [res, setRes] = useState<{
		code: string;
		message: string;
	} | null>(null);

	async function start() {
		const updated = await startReminder(id);
		if (updated.code !== "200") {
			setRes(updated);
			return;
		}

		const updatedObject: { id: number; nextNoficationAt: Date } =
			JSON.parse(updated.message);
		addNotificationToQueue(
			updatedObject.id,
			updatedObject.nextNoficationAt
		);
		console.log(queue);
		setRes(updated);
	}

	return (
		<div className="flex flex-col bg-neutral-700 aspect-video p-4 rounded-md lg:text-lg md:text-xl text-2xl">
			<p className="flex-grow">{name}</p>
			<div className="flex items-center">
				<p className="flex-grow">
					{frequency > 1
						? `${frequency} minutes`
						: `${frequency} minute`}
				</p>
				{queue.has(id) ? (
					<button
						className="text-neutral-200 hover:text-neutral-400"
						onClick={async () => await start()}>
						⏹
					</button>
				) : (
					<button
						className="text-neutral-200 hover:text-neutral-400"
						onClick={async () => await start()}>
						▶
					</button>
				)}
			</div>
			{res === null ? null : res.code !== "200" ? res.message : null}
		</div>
	);
}

export default Tile;
