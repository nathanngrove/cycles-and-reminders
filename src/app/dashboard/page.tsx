import CreateButton from "@/components/CreateButton";
import Tile from "@/components/Tile";
import { getAllReminders } from "@/lib/actions";
import React from "react";

async function Dashboard() {
	const reminders = await getAllReminders();

	return (
		<div className="grid grid-cols-fluid gap-4">
			<div className="col-span-full flex justify-between">
				<h1 className="text-4xl">Dashboard</h1>
				<CreateButton />
			</div>
			<h2 className="text-3xl col-span-full">Reminders</h2>
			{reminders.map((reminder) => {
				return (
					<Tile
						name={reminder.name}
						frequency={reminder.frequency}
						key={reminder.id}
					/>
				);
			})}
			<div className="flex gap-4 col-span-full">
				<h2 className="text-3xl ">Cycles</h2>
			</div>
			<div className="col-span-full">
				You have not created any cycles.
			</div>
		</div>
	);
}

export default Dashboard;
