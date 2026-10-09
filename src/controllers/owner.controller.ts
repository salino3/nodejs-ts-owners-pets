import { Request, Response } from "express";
import { utilitiesApp } from "../utils/utilities";
import { Owner } from "../models/owner.model";
import { CreateOwner } from "../interfaces/owners.interfaces";

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

      const result: Owner | null = await Owner.createOwner({
        name,
        email,
        phone,
      });

      if (!result) {
        throw new Error();
      }

      return res.status(201).send({ id: result });
    } catch (err: unknown) {
      return res.status(500).send({ error: "Internal server error:", err });
    }
  }
}

export const ownersControllers = new OwnersControllers();
