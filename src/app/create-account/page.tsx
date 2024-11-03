"use client";
import React, { useActionState } from "react";
import { create } from "../../db/actions";
import Link from "next/link";

function CreateAccount() {
	const [state, createAction, pending] = useActionState(create, undefined);

	return (
		<main>
			<form className="flex flex-col gap-8" action={createAction}>
				<div className="flex flex-col gap-2">
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
				</div>

				{state !== undefined ? (
					<div>
						{state?.code} : {state?.message}
					</div>
				) : null}

				<button
					disabled={pending}
					type="submit"
					className="px-2 py-1 bg-green-500 text-white font-bold rounded-sm hover:bg-green-600">
					Create account
				</button>
			</form>
			<Link href="/login">Login here.</Link>
		</main>
	);
}

export default CreateAccount;
