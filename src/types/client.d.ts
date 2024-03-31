type TClient = {
  id?: number;
  first_name?: string;
  last_name?: string;
  business_name?: string;
  email?: string;
  address: string;
  city: string;
  zip: number;
  is_pro: boolean;
  siret?: string;
  invoices?: TInvoiceGetBack[];
};

type TClientBack = {
  id: number;
  first_name: string;
  last_name: string;
  business_name: string;
  email: string;
  address: string;
  zip: number;
  city: string;
  country: string;
  siret: number;
  is_pro: boolean;
  user_id: number;
  society_id: number;
  created_at: string;
  updated_at: string;
  invoices?: TInvoiceShowBack[];
};
