import React from "react";
import Form from "next/form";

async function createReminder(formData: FormData) {
	"use server";
	console.log(formData);
}

function CreateReminder() {
	return (
		<Form
			className="flex flex-col gap-4 max-w-[50%]"
			action={createReminder}>
			<div className="flex flex-col gap-2">
				<label htmlFor="reminder-name">Name of reminder</label>
				<input
					type="text"
					name="name"
					id="reminder-name"
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
					id="reminder-time"
					className="p-2 rounded-sm bg-gray-700 focus:outline-gray-900"
				/>
			</div>
			<button
				className="px-2 py-1 bg-green-500 text-white font-bold rounded-sm hover:bg-green-600"
				type="submit">
				Create Reminder
			</button>
		</Form>
	);
}

export default CreateReminder;
