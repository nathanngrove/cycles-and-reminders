import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";

export const users = table("users", {
	id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
	username: t.varchar({ length: 24 }).unique().notNull(),
	pin: t.varchar().notNull(),
	createdAt: t.timestamp().defaultNow().notNull(),
	lastLoggedIn: t.timestamp().defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
	reminders: many(reminders),
}));

export const reminders = table("reminders", {
	id: t.serial("id").primaryKey(),
	userId: t.integer().notNull(),
	name: t.varchar({ length: 255 }).notNull(),
	frequency: t.integer().notNull(),
	createdAt: t.timestamp().defaultNow().notNull(),
	lastStartedAt: t.timestamp(),
	notificationAt: t.timestamp(),
});

export const remindersRelations = relations(reminders, ({ one }) => ({
	author: one(users, {
		fields: [reminders.userId],
		references: [users.id],
	}),
}));
