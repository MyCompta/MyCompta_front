type TUserInfos = {
  id?: number;
  name: string;
  surname?: string;
  is_pro?: boolean;
  logo?: string;
  logoAlt?: string;
  siret?: number;
  address: {
    street: string;
    city: string;
    zip: string;
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
    additional_info?: string;
  };
  author: TSocietyBack;
  client?: TUserInfos;
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

type TSocietyBack = {
  id: number;
  adress: string;
  city: string;
  zip: number;
  country: string;
  name: string;
  capital: number;
  email: string;
  id: 1;
  siret: number;
  status: string;
  created_at: string;
  updated_at: string;
  user_id: number;
};
