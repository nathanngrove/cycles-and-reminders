import { z } from "zod";

export const loginSchema = z.object({
	username: z
		.string()
		.min(4)
		.max(24)
		.regex(/^[a-zA-Z0-9]+$/)
		.trim()
		.toLowerCase(),
	pin: z.string().length(4).regex(/[0-9]/).trim(),
});

export const createUserSchema = z.object({
	username: z
		.string()
		.min(4)
		.max(24)
		.regex(/^[a-zA-Z0-9]+$/)
		.trim()
		.toLowerCase(),
	pin: z.string().length(4).regex(/[0-9]/).trim(),
	confirmPin: z.string().length(4).regex(/[0-9]/).trim(),
});
