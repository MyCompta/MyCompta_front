import { atom } from "jotai";

export const clientAtom = atom([
  {
    id: 0,
    business_name: "",
    siret: "",
    first_name: "",
    last_name: "",
    address: "",
    zip: 0,
    city: "",
    is_pro: false,
    invoices: [],
    created_at: "",
    updated_at: "",
    user_id: 0,
    society_id: 0,
  },
]);
