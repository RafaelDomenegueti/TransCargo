export class _AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export function AppError(message: string, statusCode = 400) {
  return new _AppError(message, statusCode);
}
