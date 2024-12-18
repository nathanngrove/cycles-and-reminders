import CreateButton from "@/components/CreateButton";
import {
	startReminder,
	stopReminder,
} from "@/components/notifications/NotificationActions";
import Tile from "@/components/Tile";
import { getAllReminders } from "@/lib/ReminderActions";
import React from "react";

async function Page() {
	const usersReminders = await getAllReminders();

	return (
		<div className="grid grid-cols-fluid gap-4">
			<div className="col-span-full flex justify-between">
				<h1 className="text-4xl">Dashboard</h1>
				<CreateButton />
			</div>
			<h2 className="text-3xl col-span-full">Reminders</h2>
			{usersReminders.length !== 0 ? (
				usersReminders.map((usersReminder) => {
					return (
						<Tile
							name={usersReminder.reminder.name}
							frequencyMinutes={
								usersReminder.reminder.frequencyMinutes
							}
							frequencySeconds={
								usersReminder.reminder.frequencySeconds
							}
							repeat={usersReminder.repeatEnabled}
							startReminder={startReminder}
							stopReminder={stopReminder}
							id={usersReminder.id}
							key={usersReminder.id}
						/>
					);
				})
			) : (
				<div className="col-span-full">
					You have not created any reminders.
				</div>
			)}
			<div className="flex gap-4 col-span-full">
				<h2 className="text-3xl ">Cycles</h2>
			</div>
			<div className="col-span-full">
				You have not created any cycles.
			</div>
		</div>
	);
}

export default Page;
