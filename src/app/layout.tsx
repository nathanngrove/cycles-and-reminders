import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import NotificationQueueProvider from "@/components/notifications/NotificationQueueContext";

export const metadata: Metadata = {
	title: "Wiggle",
	description: "Create reminders to help you forget less and be more active",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="max-w-[80%] mx-auto flex flex-col min-h-screen">
				<NotificationQueueProvider>
					<Header />
					<main className="flex-grow h-0">{children}</main>
				</NotificationQueueProvider>
			</body>
		</html>
	);
}
