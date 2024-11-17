"use client";

import { createReminder } from "@/lib/actions";
import React, { useActionState } from "react";

function CreateReminder() {
	const [state, createAction, pending] = useActionState(
		createReminder,
		undefined
	);

	return (
		<form className="flex flex-col gap-4 max-w-[50%]" action={createAction}>
			<div className="flex flex-col gap-2">
				<label htmlFor="reminder-name">Name of reminder</label>
				<input
					type="text"
					name="name"
					className="p-2 rounded-sm bg-gray-700 focus:outline-gray-900"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="reminder-time">
					How often would you like to be reminded?
				</label>
				<input
					type="text"
					name="time"
					className="p-2 rounded-sm bg-gray-700 focus:outline-gray-900"
				/>
			</div>
			<button
				className="px-2 py-1 bg-green-500 text-white font-bold rounded-sm hover:bg-green-600"
				type="submit">
				Create Reminder
			</button>
		</form>
	);
}

export default CreateReminder;
