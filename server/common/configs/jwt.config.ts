import { JwtModuleOptions } from "@nestjs/jwt";

export const getJWTConfig = (): JwtModuleOptions => ({
  signOptions: { algorithm: "HS256" },
  verifyOptions: { algorithms: ["HS256"] }
});
