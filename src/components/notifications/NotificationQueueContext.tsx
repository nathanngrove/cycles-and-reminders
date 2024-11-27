"use client";

import React, { createContext, useEffect, useState } from "react";

export type NotificationQueue = Map<number, Date>;

type NotificationQueueContextType = {
	queue: NotificationQueue;
	addNotificationToQueue: (
		notificationId: number,
		notificationDate: Date
	) => void;
	removeNotificationFromQueue: (notificationId: number) => void;
};

export const NotificationQueueContext =
	createContext<NotificationQueueContextType>({
		queue: new Map<number, Date>(),
		addNotificationToQueue: (
			notificationId: number,
			notificationDate: Date
		) => {},
		removeNotificationFromQueue: (notificationId: number) => {},
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
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
		undefined
	);

	const timeUntil = (date: Date) => Date.parse(date.toString()) - Date.now();

	useEffect(() => {
		if (queue.size <= 0) return;

		const id = getShortestTimeUntilNextNotification();
		const timeout = setTimeout(() => {
			checkNotifications();
		}, timeUntil(queue.get(id)!));

		if (timeoutId !== undefined) clearTimeout(timeoutId);
		setTimeoutId(timeout);
	}, [queue]);

	function getShortestTimeUntilNextNotification() {
		let shortestTime = Infinity;
		let shortestTimeKey = Infinity;
		for (const [id, date] of queue) {
			const time = timeUntil(date);
			if (time < shortestTime) {
				shortestTime = time;
				shortestTimeKey = id;
			}
		}
		return shortestTimeKey;
	}

	function checkNotifications() {
		for (const [id, date] of queue) {
			if (timeUntil(date) <= 0) {
				sendNotification(id);
			}
		}
	}

	function sendNotification(id: number) {
		console.log("Reminder " + id.toString() + " completed");
		removeNotificationFromQueue(id);
	}

	function addNotificationToQueue(
		notificationId: number,
		notificationDate: Date
	) {
		setQueue((prevQueue) => {
			const updatedQueue = new Map(prevQueue);
			updatedQueue.set(notificationId, notificationDate);
			return updatedQueue;
		});
	}

	function removeNotificationFromQueue(notificationId: number) {
		setQueue((prevQueue) => {
			const updatedQueue = new Map(prevQueue);
			updatedQueue.delete(notificationId);
			return updatedQueue;
		});
	}

	return (
		<NotificationQueueContext.Provider
			value={{
				queue,
				addNotificationToQueue,
				removeNotificationFromQueue,
			}}>
			{children}
		</NotificationQueueContext.Provider>
	);
}

export default NotificationQueueProvider;
