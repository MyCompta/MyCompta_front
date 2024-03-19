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
};

type TItem = {
  id: id;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  tax?: TTax;
  description: string;
  discount: TDiscount | false;
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
