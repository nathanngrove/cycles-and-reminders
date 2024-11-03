"use client";
import React, { useActionState } from "react";
import { create } from "../../lib/actions";
import Link from "next/link";

function CreateAccount() {
	const [state, createAction, pending] = useActionState(create, undefined);

	return (
		<div className="flex flex-col gap-4 items-center justify-center min-h-[70%] max-w-[80%] mx-auto">
			<form
				className="flex flex-col gap-4 w-full max-w-[300px]"
				action={createAction}>
				<div className="flex flex-col gap-2">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						id="username"
						className="p-2 rounded-sm bg-gray-700 focus:outline-gray-900"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="pin">PIN</label>
					<input
						type="text"
						inputMode="numeric"
						name="pin"
						id="pin"
						className="p-2 rounded-sm bg-gray-700 focus:outline-gray-900"
					/>
				</div>

				{state !== undefined ? (
					<div className="text-red-500">{state?.message}</div>
				) : null}

				<button
					disabled={pending}
					type="submit"
					className="px-2 py-1 bg-green-500 text-white font-bold rounded-sm hover:bg-green-600">
					Create account
				</button>
			</form>
			<Link href="/login">Login here</Link>
		</div>
	);
}

export default CreateAccount;
