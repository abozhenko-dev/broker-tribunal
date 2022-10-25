export const SWAGGER_FILE_BODY = {
  schema: {
    type: "object",
    properties: {
      file: {
        type: "string",
        format: "binary"
      },
      name: {
        type: "string"
      },
      alt: {
        type: "string"
      },
      title: {
        type: "string"
      },
      width: {
        type: "string"
      },
      height: {
        type: "string"
      }
    }
  }
};
