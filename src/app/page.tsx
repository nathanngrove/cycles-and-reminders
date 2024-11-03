import ButtonLink from "@/components/ButtonLink";

export default function Home() {
	return (
		<div className="grid place-items-center gap-4">
			<ButtonLink linkTo="/create-account">Create account</ButtonLink>
			<p>or</p>
			<ButtonLink linkTo="/login">Log in</ButtonLink>
		</div>
	);
}
