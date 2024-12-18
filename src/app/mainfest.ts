import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Wiggle",
		short_name: "Wiggle",
		description:
			"Create reminders to help you forget less and be more active",
		start_url: "/",
		display: "standalone",
		background_color: "#1f1f1f",
		theme_color: "#ededed",
		orientation: "portrait",
	};
}
