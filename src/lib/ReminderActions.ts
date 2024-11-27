"use server";

import { reminders } from "@/db/schema";
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
		await db
			.insert(reminders)
			.values({
				frequencySeconds: Number(reminderFrequencySeconds),
				frequencyMinutes: Number(reminderFrequencyMinutes),
				name: String(reminderName),
				userId: user.id,
			})
			.returning({ addedReminder: reminders.id });
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

	const allReminders = await db
		.select()
		.from(reminders)
		.where(eq(reminders.userId, user.id))
		.orderBy(asc(reminders.id));

	return allReminders;
}
