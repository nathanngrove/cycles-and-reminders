import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

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
			<body className="max-w-[80%] mx-auto flex flex-col min-h-screen">
				<Header />
				<main className="flex-grow h-0">{children}</main>
			</body>
		</html>
	);
}
