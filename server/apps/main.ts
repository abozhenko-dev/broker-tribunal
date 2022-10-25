import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import cookieParser from "cookie-parser";
import { json, urlencoded } from "express";

import { validatorConfig } from "@common/configs";

import { AppModule } from "./app.module";

const SERVER_PORT = process.env.PORT || 5000;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));
  app.enableCors({
    origin: [process.env.SITE_URL, process.env.ADMIN_URL],
    credentials: true
  });
  app.useGlobalPipes(new ValidationPipe(validatorConfig));

  const config = new DocumentBuilder().setTitle("Broker Tribunal API Swagger").setVersion("0.0.1").build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(SERVER_PORT);
};

bootstrap();
