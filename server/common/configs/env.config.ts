import { path } from "app-root-path";
import { resolve } from "path";

const { NODE_ENV } = process.env;

export const getEnvPaths = () => {
  const commonEnvs = resolve(`${path}/.env`);
  const commonSecrets = resolve(`${path}/.env.local`);

  const stageEnvs = resolve(`${path}/.env.${NODE_ENV}`);
  const stageSecrets = resolve(`${path}/.env.${NODE_ENV}.local`);

  return [stageSecrets, stageEnvs, commonSecrets, commonEnvs];
};
