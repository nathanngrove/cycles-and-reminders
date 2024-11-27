"use client";

import Input from "@/components/Input";
import { createReminder } from "@/lib/ReminderActions";
import React, { useActionState } from "react";

function CreateReminder() {
	const [state, createAction, pending] = useActionState(
		createReminder,
		undefined
	);

	return (
		<form className="flex flex-col gap-4 max-w-[50%]" action={createAction}>
			<Input label="Name of reminder" name="name" type="text" />
			<p>How often would you like to be reminded?</p>
			<Input label="Minutes" name="minutes" type="text" />
			<Input label="Seconds" name="seconds" type="text" />
			<button
				className="px-2 py-1 bg-green-500 text-white font-bold rounded-sm hover:bg-green-600"
				type="submit">
				Create Reminder
			</button>
		</form>
	);
}

export default CreateReminder;
