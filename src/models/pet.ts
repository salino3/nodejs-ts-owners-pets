import { PetProps } from "../interfaces/pets.interfaces";

export class Pet {
  id: number;
  owner_id: number | null;
  name: string;
  species: string;
  breed?: string;
  age: number;
  microchip_id: string;
  private created_at: Date;

  constructor(data: PetProps) {
    this.id = data.id;
    this.owner_id = data.owner_id;
    this.name = data.name;
    this.species = data.species;
    this.age = data.age;
    this.microchip_id = data.microchip_id;
    this.created_at = data.created_at;
  }
}
