import { z } from "zod";

const sharedEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
});

export default sharedEnvSchema;
