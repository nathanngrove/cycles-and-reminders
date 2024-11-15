"use client";

import CreateButton from "@/components/CreateButton";
import Tile from "@/components/Tile";
import React from "react";

function Dashboard() {
	return (
		<div className="grid grid-cols-fluid gap-4">
			<div className="col-span-full flex justify-between">
				<h1 className="text-4xl ">Dashboard</h1>
				<CreateButton />
				{/* <button className="text-lg border-2 border-white text-white rounded-full px-2 hover:text-black hover:bg-white">
					Create +
				</button> */}
			</div>
			<h2 className="text-3xl col-span-full">Reminders</h2>
			<Tile />
			<div className="flex gap-4 col-span-full">
				<h2 className="text-3xl ">Cycles</h2>
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
