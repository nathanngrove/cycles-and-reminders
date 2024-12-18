"use server";

import { db } from "@/db";
import { reminders, usersToReminders } from "@/db/schema";
import getUser from "@/lib/UserAccountActions";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function startReminder(id: number) {
	const user = await getUser();
	if (user === undefined) {
		redirect("/login");
	}

	const reminder = await db.query.usersToReminders.findFirst({
		where:
			eq(usersToReminders.id, id) && eq(usersToReminders.userId, user.id),
		with: { reminder: true },
	});

	if (reminder === undefined) {
		return { code: "400", message: "Reminder not found." };
	}

	const nextNotification = new Date(
		Date.now() +
			reminder.reminder.frequencyMinutes * 60000 +
			reminder.reminder.frequencySeconds * 1000
	);

	try {
		const updatedInfo = await db
			.update(usersToReminders)
			.set({ notificationAt: nextNotification })
			.where(eq(usersToReminders.id, id))
			.returning({
				id: usersToReminders.id,
				nextNoficationAt: usersToReminders.notificationAt,
			});

		return {
			code: "200",
			message: JSON.stringify(updatedInfo[0]),
		};
	} catch (e) {
		console.log(e);
		return { code: "500", message: "INTERNAL SERVER ERROR" };
	}
}

export async function stopReminder(id: number) {
	const user = await getUser();
	if (user === undefined) {
		redirect("/login");
	}

	const reminder = await db.query.usersToReminders.findFirst({
		where:
			eq(usersToReminders.id, id) && eq(usersToReminders.userId, user.id),
		with: { reminder: true },
	});

	if (reminder === undefined) {
		return { code: "400", message: "Reminder not found." };
	}

	try {
		const updatedInfo = await db
			.update(usersToReminders)
			.set({ notificationAt: null })
			.where(eq(usersToReminders.id, id))
			.returning({
				id: usersToReminders.id,
				nextNoficationAt: usersToReminders.notificationAt,
			});

		return {
			code: "200",
			message: JSON.stringify(updatedInfo[0]),
		};
	} catch (e) {
		console.log(e);
		return { code: "500", message: "INTERNAL SERVER ERROR" };
	}
}
