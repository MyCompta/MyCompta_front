type TUserInfos = {
  id?: number;
  name: string;
  surname?: string;
  is_pro?: boolean;
  logo?: string;
  logoAlt?: string;
  siret?: number;
  modified?: boolean;
  email?: string;
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  [key: string]: string | number | undefined | boolean | object;
};

type TInvoice = {
  id?: number;
  author: TUserInfos;
  client: TUserInfos;
  title: string;
  number: string;
  date: Date;
  dueDate: Date;
  subTotal: number;
  tax: TTax[];
  discountTotal: number;
  total: number;
  items: TItem[];
  is_draft?: boolean;
  is_paid?: boolean;
  status?: string;
  additionalInfo?: string;
  is_valid?: boolean;
};

type TItem = {
  id: id;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  tax: TTax;
  description: string;
  discount?: TDiscount;
};

type TTax = {
  percentage: number;
  total: number;
};

type TDiscount = {
  name: string;
  percentage: number;
  total: number;
};

type TInvoiceShowBack = {
  invoice: {
    id: number;
    content: json;
    issued_at: string;
    due_at: string;
    title: string;
    number: string;
    subtotal: number;
    tva: number;
    total: number;
    sale: number;
    is_draft: boolean;
    is_paid: boolean;
    status: string;
    society_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    additional_info?: string;
  };
  author: TSocietyBack;
  client: TClientBack;
};

type TInvoiceGetBack = {
  id: number;
  content: json;
  date: string;
  due_date: string;
  title: string;
  number: string;
  subtotal: number;
  tva: number;
  total: number;
  sale: number;
  is_draft: boolean;
  is_paid: boolean;
  status: string;
  society_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
};

type TClientBack = {
  id: number;
  first_name?: string;
  last_name?: string;
  business_name?: string;
  email: string;
  created_at: string;
  updated_at: string;
  address: string;
  city: string;
  zip: number;
  is_pro: boolean;
  siret?: string;
};
