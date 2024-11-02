import type { Metadata } from "next";
import "./globals.css";

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
			<body>{children}</body>
		</html>
	);
}
