"use client";

import React, { useActionState } from "react";
import { login } from "../../db/actions";

function LoginForm() {
	const [state, loginAction, pending] = useActionState(login, undefined);

	return (
		<form className="flex flex-col gap-8" action={loginAction}>
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
					<label htmlFor="pin">Pin</label>
					<input
						type="text"
						name="pin"
						id="pin"
						className="p-2 rounded-sm bg-gray-700 focus:outline-gray-900"
					/>
				</div>
			</div>
			<button
				disabled={pending}
				type="submit"
				className="px-2 py-1 bg-green-500 text-white font-bold rounded-sm hover:bg-green-600">
				Log in
			</button>
		</form>
	);
}

export default LoginForm;
