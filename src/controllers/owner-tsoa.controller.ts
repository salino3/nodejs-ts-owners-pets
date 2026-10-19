import {
  Controller,
  Route,
  Post,
  Body,
  SuccessResponse,
  Response,
  Tags,
} from "tsoa";
import { utilitiesApp } from "../utils/utilities";
import { Owner } from "../models/owner.model";
import { CreateOwner, GetOwner } from "../interfaces/owners.interfaces";

const { isValidEmail } = utilitiesApp();

@Tags("Owners")
@Route("api/tsoa/owners")
export class OwnersTsoaController extends Controller {
  @Post("/")
  @SuccessResponse(201, "Created")
  @Response(400, "Bad Request")
  @Response(500, "Internal Server Error")
  public async fnCreateOwner(@Body() requestBody: CreateOwner): Promise<Owner> {
    const { name, email, phone } = requestBody;

    if (!name || !email) {
      this.setStatus(400);
      throw new Error("Name and Email values are mandatory");
    }

    if (!isValidEmail(email)) {
      this.setStatus(400);
      throw new Error("Email format is incorrect");
    }

    const result: Owner | null = await Owner.createOwner({
      name,
      email,
      phone,
    });

    if (!result) {
      this.setStatus(500);
      throw new Error("Failed to create owner");
    }

    this.setStatus(201);
    return result;
  }
}
