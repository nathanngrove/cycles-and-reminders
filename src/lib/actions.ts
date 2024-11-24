"use server";

import { db } from "@/db";
import { reminders, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import * as bcrypt from "bcrypt";
import { DatabaseError } from "pg";
import { createSession } from "./session";
import { redirect } from "next/navigation";
import getUser from "./getUser";
import { loginSchema, createUserSchema } from "./zodSchemas";

export async function login(prevState: any, formData: FormData) {
	const result = loginSchema.safeParse(Object.fromEntries(formData));

	if (!result.success) {
		console.log(result.error.flatten().fieldErrors);
		return { code: "400", message: "Enter a valid username and PIN." };
	}

	const { username, pin } = result.data;

	const user = await db
		.select()
		.from(users)
		.where(eq(users.username, username))
		.limit(1);

	if (user.length === 0)
		return {
			code: "400",
			message: "Enter a valid username and PIN.",
		};

	if (await bcrypt.compare(pin, user[0].pin)) {
		const update = await db
			.update(users)
			.set({ lastLoggedIn: sql`now()` })
			.where(eq(users.id, user[0].id))
			.returning({ updatedId: users.id });
		console.log(update[0].updatedId);

		await createSession(String(update[0].updatedId));
		redirect("/dashboard");
	}

	return { code: "400", message: "Enter a valid username and PIN." };
}

export async function create(prevState: any, formData: FormData) {
	const result = createUserSchema.safeParse(Object.fromEntries(formData));
	if (!result.success) {
		console.log(result.error.flatten().fieldErrors);
		return { code: "400", message: "Enter a valid username and PIN." };
	}

	const { username, pin, confirmPin } = result.data;

	if (pin !== confirmPin)
		return { code: "400", message: "PINs do not match." };

	try {
		const hashedPin = await bcrypt.hash(pin, 10);
		const user = await db
			.insert(users)
			.values({ username, pin: hashedPin })
			.returning({ insertedUser: users.id });

		await createSession(String(user[0].insertedUser));
	} catch (e) {
		if (e instanceof DatabaseError) {
			if (e.code === "23505") {
				return {
					code: e.code,
					message: "Username is already taken.",
				};
			}
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

export async function createReminder(prevState: any, formData: FormData) {
	const user = await getUser();
	if (!user) {
		return {
			code: "401",
			message: "You must be logged in to create a reminder.",
		};
	}

	const reminderName = formData.get("name");
	const reminderFrequency = formData.get("time");

	if (!reminderName || !reminderFrequency) {
		return {
			code: "400",
			message: "You must provide a name and frequency for your reminder.",
		};
	}

	try {
		await db
			.insert(reminders)
			.values({
				frequency: Number(reminderFrequency),
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
		.where(eq(reminders.userId, user.id));

	return allReminders;
}

export async function startReminder(id: number) {
	const user = await getUser();
	if (user === undefined) {
		redirect("/login");
	}

	const reminder = await db.query.reminders.findFirst({
		where: eq(reminders.userId, user.id) && eq(reminders.id, id),
		columns: { frequency: true },
	});

	if (reminder === undefined) {
		return { code: "400", message: "Reminder not found." };
	}

	const nextNotification = new Date(Date.now() + reminder!.frequency * 60000);

	try {
		await db
			.update(reminders)
			.set({ notificationAt: nextNotification })
			.where(eq(reminders.userId, user.id) && eq(reminders.id, id))
			.returning({ nextNoficationAt: reminders.notificationAt });

		return {
			code: "200",
			message: "Reminder started.",
		};
	} catch (e) {
		console.log(e);
		return { code: "500", message: "INTERNAL SERVER ERROR" };
	}
}
