import { Request, Response, NextFunction } from "express";

function adminOnly(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user || req.session.user.role !== "admin") {
    res.redirect("/");
  } else {
    next();
  }
}

export default adminOnly;
