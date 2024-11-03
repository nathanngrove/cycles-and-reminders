import Tile from "@/components/Tile";
import React from "react";

function Dashboard() {
	return (
		<div className="flex flex-col gap-8">
			<h1 className="text-3xl">Dashboard</h1>
			<div className="flex flex-col gap-4">
				<h2 className="text-2xl">Cycles</h2>
				<div className="grid grid-cols-fluid gap-4">
					<Tile />
					<Tile />
					<Tile />
					<Tile />
					<Tile />
					<Tile />
					<Tile />
					<Tile />
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<h2 className="text-2xl">Reminders</h2>
				<Tile />
			</div>
		</div>
	);
}

export default Dashboard;
