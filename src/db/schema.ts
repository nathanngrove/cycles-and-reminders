import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";

export const users = table("users", {
	id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
	name: t.varchar({ length: 255 }).notNull(),
	created_at: t.timestamp().defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
	reminders: many(reminders),
}));

export const reminders = table("reminders", {
	id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
	user_id: t.integer().notNull(),
	name: t.varchar({ length: 255 }).notNull(),
	frequency: t.integer().notNull(),
	created_at: t.timestamp().defaultNow().notNull(),
	last_started_at: t.timestamp(),
	notification_at: t.timestamp(),
});

export const remindersRelations = relations(reminders, ({ one }) => ({
	author: one(users, {
		fields: [reminders.user_id],
		references: [users.id],
	}),
}));
