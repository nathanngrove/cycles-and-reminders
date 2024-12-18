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
	usersToReminders: many(usersToReminders),
}));

export const reminders = table("reminders", {
	id: t.serial("id").primaryKey(),
	name: t.varchar({ length: 255 }).notNull(),
	frequencyMinutes: t.integer().notNull(),
	frequencySeconds: t.integer().notNull(),
	createdAt: t.timestamp().defaultNow().notNull(),
});

export const remindersRelations = relations(reminders, ({ many }) => ({
	usersToReminders: many(usersToReminders),
}));

export const usersToReminders = table("usersToReminders", {
	id: t.serial("id").primaryKey(),
	userId: t.integer().notNull(),
	reminderId: t.integer().notNull(),
	repeatEnabled: t.boolean().default(false).notNull(),
	createdAt: t.timestamp().defaultNow().notNull(),
	lastStartedAt: t.timestamp(),
	notificationAt: t.timestamp(),
});

export const usersToGroupsRelations = relations(
	usersToReminders,
	({ one }) => ({
		reminder: one(reminders, {
			fields: [usersToReminders.reminderId],
			references: [reminders.id],
		}),
		user: one(users, {
			fields: [usersToReminders.userId],
			references: [users.id],
		}),
	})
);
