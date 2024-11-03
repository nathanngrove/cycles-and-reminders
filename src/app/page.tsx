import ButtonLink from "@/components/ButtonLink";

export default function Home() {
	return (
		<div className="flex flex-col gap-4 items-center justify-center min-h-[70%]">
			<ButtonLink linkTo="/create-account">Create account</ButtonLink>
			<p>or</p>
			<ButtonLink linkTo="/login">Log in</ButtonLink>
		</div>
	);
}
