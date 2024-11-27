"use server";

import { db } from "@/db";
import { reminders } from "@/db/schema";
import getUser from "@/lib/UserAccountActions";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function startReminder(id: number) {
	const user = await getUser();
	if (user === undefined) {
		redirect("/login");
	}

	const reminder = await db.query.reminders.findFirst({
		where: eq(reminders.userId, user.id) && eq(reminders.id, id),
		columns: { frequencyMinutes: true, frequencySeconds: true },
	});

	if (reminder === undefined) {
		return { code: "400", message: "Reminder not found." };
	}

	const nextNotification = new Date(
		Date.now() +
			reminder.frequencyMinutes * 60000 +
			reminder.frequencySeconds * 1000
	);

	try {
		const updatedInfo = await db
			.update(reminders)
			.set({ notificationAt: nextNotification })
			.where(eq(reminders.userId, user.id) && eq(reminders.id, id))
			.returning({
				id: reminders.id,
				nextNoficationAt: reminders.notificationAt,
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

	const reminder = await db.query.reminders.findFirst({
		where: eq(reminders.userId, user.id) && eq(reminders.id, id),
		columns: { frequencyMinutes: true, frequencySeconds: true },
	});

	if (reminder === undefined) {
		return { code: "400", message: "Reminder not found." };
	}

	try {
		const updatedInfo = await db
			.update(reminders)
			.set({ notificationAt: null })
			.where(eq(reminders.userId, user.id) && eq(reminders.id, id))
			.returning({
				id: reminders.id,
				nextNoficationAt: reminders.notificationAt,
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
