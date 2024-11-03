import React from "react";

function Tile() {
	return (
		<div className="flex flex-col bg-neutral-700 p-6 gap-8 rounded-md">
			<p className="flex-grow">Drink water and sit and stand</p>
			<div className="flex items-center">
				<p className="flex-grow">Frequency</p>
				<div className="size-4 bg-slate-200"></div>
			</div>
		</div>
	);
}

export default Tile;
