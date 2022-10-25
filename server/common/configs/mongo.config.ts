import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose";

export const getMongoDbConfig = (config: ConfigService): MongooseModuleOptions => {
  const user = config.get("MONGO_USER");
  const pass = config.get("MONGO_PASSWORD");
  const host = config.get("MONGO_HOST");
  const database = config.get("MONGO_DATABASE");
  const port = config.get("MONGO_PORT");

  const uri = `mongodb://${user}:${pass}@${host}:${port}/${database}?authSource=admin`;

  return {
    uri,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 10000,
    ignoreUndefined: true
  };
};
