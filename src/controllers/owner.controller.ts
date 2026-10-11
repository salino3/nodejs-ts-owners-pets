import { Request, Response } from "express";
import { utilitiesApp } from "../utils/utilities";
import { Owner } from "../models/owner.model";
import { CreateOwner, GetOwner } from "../interfaces/owners.interfaces";

const { isValidEmail } = utilitiesApp();

class OwnersControllers {
  async fnCreateOwner(req: Request, res: Response): Promise<Response<Owner>> {
    try {
      const { name, email, phone } = req.body as CreateOwner;
      if (!name || !email) {
        return res.status(401).send("Name and Email values are mandatory");
      }

      if (!isValidEmail(email)) {
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

      return res.status(201).send(result);
    } catch (err: unknown) {
      return res.status(500).json({
        error: "Internal server error",
        // in case throw new Error("...");
        message: err instanceof Error ? err.message : err,
      });
    }
  }

  //
  async fnGetAllOwners(
    req: Request,
    res: Response,
  ): Promise<Response<GetOwner[]>> {
    try {
      const owners: GetOwner[] = await Owner.getAllOwners();

      return res.status(200).json(owners);
    } catch (err: unknown) {
      return res.status(500).json({
        error: "Internal server error",
        message: err instanceof Error ? err.message : err,
      });
    }
  }

  async fnGetOwnerByID(
    req: Request,
    res: Response,
  ): Promise<Response<GetOwner>> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).send("Error: Owner ID is mandatory");
      }

      const result: GetOwner | null = await Owner.getOwnerByID(id as string);

      if (!result || !result.id) {
        return res.status(404).send("Error: Owner Not Found");
      }

      return res.status(200).json(result);
    } catch (err: unknown) {
      console.error("Error in fnGetOwnerByID:", err);

      if (err instanceof Error) {
        return res.status(500).json({
          error: "Internal server error",
          message: err.message,
          stack: err.stack,
        });
      }

      return res.status(500).json({
        error: "Internal server error",
        message: err,
      });
    }
  }

  //
  async fnDeleteOwnerByID(
    req: Request,
    res: Response,
  ): Promise<Response<boolean>> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).send("Error: Owner ID is mandatory");
      }

      const result: boolean = await Owner.deleteOwnerByID(id as string);

      if (!result) {
        return res.status(404).send("Error: Owner Not Found");
      }

      return res.status(200).send("Owner successfully deleted");
    } catch (err: unknown) {
      return res.status(500).json({
        error: "Internal server error",
        message: err instanceof Error ? err.message : err,
      });
    }
  }

  //
  async fnUpdateOwnerByID(
    req: Request,
    res: Response,
  ): Promise<Response<GetOwner>> {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;
      // TODO: Add validations parameters

      const ownerId = Number(id);

      if (!id || !Number.isInteger(ownerId) || ownerId <= 0) {
        return res.status(400).json({
          error: "Invalid owner ID",
        });
      }

      const data: Partial<CreateOwner> = {};

      if (name !== undefined) data.name = name;
      if (email !== undefined) data.email = email;
      if (phone !== undefined) data.phone = phone;

      if (Object.keys(data).length === 0) {
        return res.status(400).json({
          error: "At least one field is required to update",
        });
      }

      const owner: GetOwner | null = await Owner.updateOwnerByID(ownerId, data);

      if (!owner) {
        return res.status(404).json({
          error: "Owner not found",
        });
      }

      return res.status(200).json(owner);
    } catch (err: unknown) {
      console.error("Error in fnUpdateOwnerByID:", err);

      return res.status(500).json({
        error: "Internal server error",
        // in case throw new Error("...");
        message: err instanceof Error ? err.message : err,
      });
    }
  }
}

export const ownersControllers = new OwnersControllers();
