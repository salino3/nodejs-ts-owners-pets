import { Request, Response } from "express";
import { utilitiesApp } from "../utils/utilities";
import { CreateOwner, OwnerProps } from "../interfaces/owners.interfaces";

const { isValidEmail } = utilitiesApp();

class OwnersControllers {
  async fnCreateOwner(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, phone } = req.body as CreateOwner;

      if (!name || !email) {
        return res.status(401).send("Name and Email values are mandatory");
      }

      if (isValidEmail(email)) {
        return res.status(401).send("Email format is incorrect");
      }
    } catch (error) {}
  }
}
