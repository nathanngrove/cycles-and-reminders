"use server";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function getUser() {
	try {
		const cookie = (await cookies()).get("session")?.value;
		const session = await decrypt(cookie);

		const user = await db
			.select({
				id: users.id,
				username: users.username,
				lastLoggedIn: users.lastLoggedIn,
			})
			.from(users)
			.where(eq(users.id, Number(session?.userId)))
			.limit(1);
		return user[0];
	} catch (e) {
		console.log("No user found.");
	}
}
