type Env = {
  STABLE_DIFFUSION_WS_URI: string;
  STABLE_DIFFUSION_API_KEY: string;
};

const getEnvVariables = (): Env => {
  const envVars: Partial<Env> = {};

  for (const key of Object.keys(import.meta.env)) {
    if (key.startsWith("VITE_")) {
      const envKey = key.replace("VITE_", "");
      envVars[envKey as keyof Env] = import.meta.env[key] as string;
    }
  }

  return envVars as Env;
};

export const env = getEnvVariables();
