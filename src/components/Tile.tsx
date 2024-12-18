"use client";
import React, { useContext, useState } from "react";
import { NotificationQueueContext } from "./notifications/NotificationQueueContext";

type TileProps = {
	name: string;
	frequencyMinutes: number;
	frequencySeconds: number;
	repeat: boolean;
	id: number;
	startReminder: (id: number) => Promise<{
		code: string;
		message: string;
	}>;
	stopReminder: (id: number) => Promise<{
		code: string;
		message: string;
	}>;
};

function Tile({
	name,
	frequencyMinutes,
	frequencySeconds,
	repeat,
	startReminder,
	stopReminder,
	id,
}: TileProps) {
	const { queue, addNotificationToQueue, removeNotificationFromQueue } =
		useContext(NotificationQueueContext);

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

	async function stop() {
		const updated = await stopReminder(id);
		const updatedObject: { id: number; nextNoficationAt: Date | null } =
			JSON.parse(updated.message);
		removeNotificationFromQueue(updatedObject.id);
		console.log(queue);
		setRes(updated);
	}

	return (
		<div className="flex flex-col bg-neutral-700 aspect-video p-4 rounded-md lg:text-lg md:text-xl text-2xl">
			<p className="flex-grow">{name}</p>
			<div className="flex items-center">
				<div className="flex-grow">
					<p>
						{frequencyMinutes > 1
							? `${frequencyMinutes} minutes`
							: frequencyMinutes === 0
							? null
							: `${frequencyMinutes} minute`}
					</p>
					<p>
						{frequencySeconds > 1
							? `${frequencySeconds} seconds`
							: frequencySeconds === 0
							? null
							: `${frequencySeconds} second`}
					</p>
				</div>
				{queue.has(id) ? (
					<button
						className="text-neutral-200 hover:text-neutral-400"
						onClick={async () => await stop()}>
						◼
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
