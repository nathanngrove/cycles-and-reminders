"use server";

import { reminders, usersToReminders } from "@/db/schema";
import getUser from "./UserAccountActions";
import { db } from "@/db";
import { DatabaseError } from "pg";
import { redirect } from "next/navigation";
import { asc, eq } from "drizzle-orm";

export async function createReminder(prevState: any, formData: FormData) {
	const user = await getUser();
	if (!user) {
		return {
			code: "401",
			message: "You must be logged in to create a reminder.",
		};
	}

	const reminderName = formData.get("name");
	const reminderFrequencyMinutes = formData.get("minutes");
	const reminderFrequencySeconds = formData.get("seconds");

	if (
		!reminderName ||
		!reminderFrequencyMinutes ||
		!reminderFrequencySeconds
	) {
		return {
			code: "400",
			message: "You must provide a name and frequency for your reminder.",
		};
	}

	try {
		const createReminder = await db
			.insert(reminders)
			.values({
				frequencySeconds: Number(reminderFrequencySeconds),
				frequencyMinutes: Number(reminderFrequencyMinutes),
				name: String(reminderName),
			})
			.returning({ addedReminder: reminders.id });

		await db.insert(usersToReminders).values({
			reminderId: createReminder[0].addedReminder,
			userId: user.id,
		});
	} catch (e) {
		if (e instanceof DatabaseError) {
			return {
				code: e.code === undefined ? "400" : e.code,
				message: e.message,
			};
		} else {
			console.log(e);
			return { code: "500", message: "INTERNAL SERVER ERROR" };
		}
	}
	redirect("/dashboard");
}

export async function getAllReminders() {
	const user = await getUser();
	if (!user) {
		redirect("/login");
	}

	const allReminders = await db.query.usersToReminders.findMany({
		columns: {
			createdAt: true,
			id: true,
			lastStartedAt: true,
			notificationAt: true,
			repeatEnabled: true,
		},
		with: {
			reminder: true,
		},
		orderBy: asc(usersToReminders.id),
	});

	return allReminders;
}
