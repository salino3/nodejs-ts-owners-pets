import { CreateOwner, OwnerProps } from "../interfaces/owners.interfaces";

export class Owner {
  id: number;
  name: string;
  email: string;
  phone?: string;
  private created_at: Date;

  constructor(data: OwnerProps) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.created_at = data.created_at;
  }

  //
  static async createOwner(data: CreateOwner) {}
}
