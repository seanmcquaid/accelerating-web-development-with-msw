import { z } from "zod";
import sharedEnvSchema from "./sharedEnvSchema";

const serverEnvSchema = sharedEnvSchema.extend({
  MSW_ENABLED_IN_DEVELOPMENT: z
    .string()
    .transform((val) => Boolean(JSON.parse(JSON.stringify(val))))
    .optional(),
});

const env = serverEnvSchema.parse(process.env);

export default env;
