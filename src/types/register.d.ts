type TRegisterBack = {
  id: number;
  paid_at: string;
  society_id: number;
  invoice_id?: number;
  amount: number;
  title: string;
  comment?: string;
  payment_method: "cash" | "card" | "cheque" | "transfer" | "other";
  is_income: boolean;
  created_at: string;
  updated_at: string;
};
