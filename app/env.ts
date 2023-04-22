import { z } from "zod";

const envSchema = z.object({
  MSW_ENABLED_IN_DEVELOPMENT: z.coerce.boolean().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

const env = envSchema.parse(process.env);

export default env;
