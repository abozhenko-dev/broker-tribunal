import { HttpException, HttpStatus } from "@nestjs/common";

export class DuplicateSlugException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Запись с таким url(чпу) уже существует!",
        error: "Bad Request"
      },
      HttpStatus.BAD_REQUEST
    );
  }
}
