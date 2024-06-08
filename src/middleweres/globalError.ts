import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const globalErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error,
  });
};

export default globalErrorHandler;
