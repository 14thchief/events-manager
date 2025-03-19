export interface Coupon extends Record<string, any> {
  id?: string | number;
  name: string;
  type: string;
  value: number;
  max_value: number;
  code?: string;
  status: "active" | "inactive";
  expires_at: number;
}
