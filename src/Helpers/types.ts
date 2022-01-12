import { Request } from "express";

export interface CustomRequest<T> extends Request {
  body: T;
}

export interface RegisterBody {
  firstName: string;
  lastName: string;
  wishes: string;
}
