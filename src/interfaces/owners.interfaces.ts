export interface OwnerProps {
  id: number;
  name: string;
  email: string;
  phone?: string;
  created_at: Date;
}

export interface CreateOwner extends Omit<OwnerProps, "id" | "created_at"> {}
