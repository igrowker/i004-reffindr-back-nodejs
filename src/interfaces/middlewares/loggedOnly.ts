import { Request, Response, NextFunction } from "express";

function loggedOnly(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user) {
    res.redirect("/user/login");
  } else {
    next();
  }
}

export default loggedOnly;