import React from "react";
import CreateReminder from "./CreateReminder";

function Page() {
	return (
		<div className="grid place-items-center">
			<h1 className="text-xl font-bold">Create Reminder</h1>
			<CreateReminder />
		</div>
	);
}

export default Page;
