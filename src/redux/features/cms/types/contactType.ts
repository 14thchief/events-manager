export interface Contact {
  id: number;
  billing_address: string;
  billing_entity_name: string;
  company: string;
  email: string;
  name: string;
  phone_number: string;
  status?: "active" | "inactive";
}
