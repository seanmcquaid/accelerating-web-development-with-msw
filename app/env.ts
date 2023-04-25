import { z } from "zod";

const envSchema = z.object({
  MSW_ENABLED_IN_DEVELOPMENT: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

const env = envSchema.parse(
  typeof window === "undefined" ? process.env : window.process.env
);

export default env;
