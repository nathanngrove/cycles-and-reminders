import React from "react";
import Form from "next/form";
import { redirect } from "next/navigation";

async function loginUser(formData: FormData) {
	"use server";
	const user = formData.get("username");
	redirect("/create-reminder");
}

function Login() {
	return (
		<Form className="flex gap-2 flex-col max-w-[50%]" action={loginUser}>
			<label htmlFor="username">Username</label>
			<input
				type="text"
				name="username"
				id="username"
				className="p-2 rounded-sm bg-gray-700 focus:outline-gray-900"
			/>
			<button
				type="submit"
				className="px-2 py-1 bg-green-500 text-white font-bold rounded-sm hover:bg-green-600">
				Login or Create Account
			</button>
		</Form>
	);
}

export default Login;
