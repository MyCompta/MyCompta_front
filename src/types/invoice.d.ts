type TUserInfos = {
  name: string;
  surname?: string;
  is_pro?: boolean;
  logo: string;
  logoAlt?: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
  [key: string]: string | undefined | object;
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

type TInvoiceDataform = {
  invoice: {
    content: {
      items: TItem[];
      tax: TTax[];
    };
    date: Date;
    dueDate: Date;
    title: string;
    number: string;
    subTotal: number;
    tva: number;
    total: number;
    sale: number;
    is_draft: boolean;
    is_paid: boolean;
    status: string;
  };
};
