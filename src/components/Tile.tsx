import React from "react";

type TileProps = {
	name: string;
	frequency: number;
};

function Tile({ name, frequency }: TileProps) {
	return (
		<div className="flex flex-col bg-neutral-700 aspect-video p-4 rounded-md lg:text-lg md:text-xl text-2xl">
			<p className="flex-grow">{name}</p>
			<div className="flex items-center">
				<p className="flex-grow">{frequency} minutes</p>
				<button className="text-neutral-200 hover:text-neutral-400">
					▶
				</button>
			</div>
		</div>
	);
}

export default Tile;
