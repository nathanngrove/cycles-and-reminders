import Tile from "@/components/Tile";
import React from "react";

function Dashboard() {
	return (
		<div className="grid grid-cols-fluid gap-4">
			<h1 className="text-4xl col-span-full">Dashboard</h1>
			<div className="flex gap-4 col-span-full">
				<h2 className="text-3xl ">Reminders</h2>
				<button className="text-lg border-2 border-white text-white rounded-full px-2 hover:font-bold hover:text-black hover:bg-white">
					+ New
				</button>
			</div>
			<Tile />
			<div className="flex gap-4 col-span-full">
				<h2 className="text-3xl ">Cycles</h2>
				<button className="text-lg border-2 border-white text-white rounded-full px-2 hover:font-bold hover:text-black hover:bg-white">
					+ New
				</button>
			</div>
			<Tile />
			<Tile />
			<Tile />
			<Tile />
			<Tile />
			<Tile />
			<Tile />
			<Tile />
		</div>
	);
}

export default Dashboard;
