"use client";
import React, { useActionState } from "react";
import { create } from "../../lib/UserAccountActions";
import Link from "next/link";
import Input from "@/components/Input";

function CreateAccount() {
	const [state, createAction, pending] = useActionState(create, undefined);

	return (
		<div className="flex flex-col gap-4 items-center justify-center min-h-[70%] max-w-[80%] mx-auto">
			<form
				className="flex flex-col gap-4 w-full max-w-[300px]"
				action={createAction}>
				<Input label="Username" name="username" type="text" />
				<Input label="PIN" name="pin" type="password" />
				<Input label="Confirm PIN" name="confirmPin" type="password" />

				{state !== undefined ? (
					<div className="text-red-500">{state?.message}</div>
				) : null}

				<button
					disabled={pending}
					type="submit"
					className="p-2 bg-green-500 text-white font-bold text-lg rounded-sm hover:bg-green-600">
					Create account
				</button>
			</form>
			<Link href="/login">Login here</Link>
		</div>
	);
}

export default CreateAccount;
