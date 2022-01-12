import { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  const logString = `${new Date().toLocaleString("ru")} ] ${req.method} [ HIT: ${req.path}`
  console.log(logString);
  next();
}
