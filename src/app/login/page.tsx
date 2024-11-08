"use client";

import React, { useActionState } from "react";
import { login } from "../../lib/actions";
import Link from "next/link";
import Input from "@/components/Input";

function LoginForm() {
	const [state, loginAction, pending] = useActionState(login, undefined);

	return (
		<div className="flex flex-col gap-4 items-center justify-center min-h-[70%] max-w-[80%] mx-auto">
			<form
				className="flex flex-col gap-4 w-full max-w-[300px]"
				action={loginAction}>
				<div className="flex flex-col gap-2">
					<Input label="Username" name="username" type="text" />
					<Input label="PIN" name="pin" type="password" />
				</div>

				{state !== undefined ? (
					<div className="text-red-500">{state?.message}</div>
				) : null}

				<button
					disabled={pending}
					type="submit"
					className="p-2 bg-green-500 text-white font-bold text-lg rounded-sm hover:bg-green-600">
					Log in
				</button>
			</form>
			<Link href="/create-account">Create account</Link>
		</div>
	);
}

export default LoginForm;
