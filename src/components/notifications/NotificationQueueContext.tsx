"use client";

import React, { createContext, useState } from "react";

export type NotificationQueue = Map<number, Date>;

type NotificationQueueContextType = {
	queue: NotificationQueue;
	addNotificationToQueue: (
		notificationId: number,
		notificationDate: Date
	) => void;
};

export const NotificationQueueContext =
	createContext<NotificationQueueContextType>({
		queue: new Map<number, Date>(),
		addNotificationToQueue: (
			notificationId: number,
			notificationDate: Date
		) => {},
	});

type NotificationQueueProviderProps = {
	children: React.ReactNode;
};

function NotificationQueueProvider({
	children,
}: NotificationQueueProviderProps) {
	const [queue, setQueue] = useState<NotificationQueue>(
		new Map<number, Date>()
	);

	function addNotificationToQueue(
		notificationId: number,
		notificationDate: Date
	) {
		console.log(notificationDate, notificationId);
		setQueue((prevQueue) => {
			const updatedQueue = new Map(prevQueue);
			updatedQueue.set(notificationId, notificationDate);
			return updatedQueue;
		});
	}

	return (
		<NotificationQueueContext.Provider
			value={{ queue, addNotificationToQueue }}>
			{children}
		</NotificationQueueContext.Provider>
	);
}

export default NotificationQueueProvider;
