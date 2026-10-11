import { query } from "../db";
import {
  CreateOwner,
  GetOwner,
  OwnerProps,
} from "../interfaces/owners.interfaces";

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
    this.phone = data.phone;
    this.created_at = data.created_at;
  }

  //
  static async createOwner(data: CreateOwner): Promise<Owner | null> {
    const sql = `INSERT INTO owners (name, email, phone)
    VALUES ($1, $2, $3)
    RETURNING *
    `;

    const { name, email, phone } = data as CreateOwner;

    const result = await query(sql, [name, email, phone]);
    if (result.rows.length === 0) {
      return null;
    }

    return new Owner(result.rows[0]);
  }

  //
  static async getAllOwners(): Promise<GetOwner[]> {
    const sql = `
      SELECT COALESCE(
     json_agg(to_jsonb(owners) - '{created_at}'::text[]), 
     '[]'::json
   ) AS owners_list 
    FROM owners;
 `;
    const result = await query(sql);

    return result.rows[0]?.owners_list ?? [];
  }
}
