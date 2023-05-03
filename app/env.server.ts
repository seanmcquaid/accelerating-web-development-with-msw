import envSchema from "./envSchema";

const env = envSchema.parse(process.env);

export default env;
