import { ConfigService } from "@nestjs/config";

import { MailmanOptions } from "@squareboat/nest-mailman";

export const getMailmanConfig = (config: ConfigService): MailmanOptions => {
  const host = config.get("MAIL_HOST");
  const port = config.get("MAIL_PORT");
  const username = config.get("MAIL_USERNAME");
  const password = config.get("MAIL_PASSWORD");
  const from = config.get("MAIL_ADMIN");
  const path = "common/mails";

  return {
    host,
    port,
    username,
    password,
    from,
    path
  };
};
