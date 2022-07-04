export class Errors {
  message;
  path: null;
  statusCode;
  constructor(message: any, statusCode = 400, path = null) {
    this.message = message;
    this.statusCode = statusCode;
    this.path = path;
  }
}
