import { z } from "zod";
import sharedEnvSchema from "./sharedEnvSchema";

const clientEnvSchema = sharedEnvSchema.extend({
  MSW_ENABLED_IN_DEVELOPMENT: z.boolean(),
});

const env = clientEnvSchema.parse(window.process.env);

export default env;
