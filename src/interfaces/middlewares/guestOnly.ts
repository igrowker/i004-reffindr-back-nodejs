import { Request, Response, NextFunction } from "express";

function guestOnly(req: Request, res: Response, next: NextFunction) {
  if (req.session.isLogged) {
    res.redirect("/");
  } else {
    next();
  }
}

export default guestOnly;
