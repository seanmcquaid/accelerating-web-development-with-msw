import envSchema from "./envSchema";

const env = envSchema.parse(window.process.env);

export default env;
