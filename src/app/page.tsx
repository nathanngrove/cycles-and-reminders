import ButtonLink from "@/components/ButtonLink";
import Login from "./login/Login";

export default function Home() {
	return (
		<div className="grid place-items-center gap-4">
			<Login />
			<ButtonLink linkTo="/create-reminder" label="Create Reminder" />
		</div>
	);
}
