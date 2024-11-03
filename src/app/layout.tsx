import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Cycles and Reminders",
	description: "Create cycles and reminders to help you forget less",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="max-w-[80%] mx-auto">
				<header className="flex justify-between items-center py-8">
					<Link href="/" className="font-bold text-xl">
						Cycles and Reminders
					</Link>
					<div className="size-[50px] bg-white rounded-full"></div>
				</header>
				{children}
			</body>
		</html>
	);
}
