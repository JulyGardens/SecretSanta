import { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  console.log(
    `${new Date().toLocaleString("ru")} ] ${req.method} [ HIT: ${req.path}`
  );
  next();
}
