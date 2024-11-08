"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import * as bcrypt from "bcrypt";
import { DatabaseError } from "pg";
import { createSession } from "./session";
import { redirect } from "next/navigation";

const loginSchema = z.object({
	username: z
		.string()
		.min(4)
		.max(24)
		.regex(/^[a-zA-Z0-9]+$/)
		.trim()
		.toLowerCase(),
	pin: z.string().length(4).regex(/[0-9]/).trim(),
});

const createUserSchema = z.object({
	username: z
		.string()
		.min(4)
		.max(24)
		.regex(/^[a-zA-Z0-9]+$/)
		.trim()
		.toLowerCase(),
	pin: z.string().length(4).regex(/[0-9]/).trim(),
	confirmPin: z.string().length(4).regex(/[0-9]/).trim(),
});

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
