import { Request, Response, NextFunction } from "express";

export const catchAsyncErrors =
  (theFunc: any) => (req: Request, Res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, Res, next)).catch(next);
  };
