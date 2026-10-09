export interface PetProps {
  id: number;
  owner_id: number | null;
  name: string;
  species: string;
  breed?: string;
  age: number;
  microchip_id: string;
  created_at: Date;
}
