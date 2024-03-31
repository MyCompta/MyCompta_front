import { atom } from "jotai";

export const registerAtom = atom<TRegisterBack | null>({
  id: 0,
  paid_at: "",
  society_id: 0,
  amount: 0,
  title: "",
  comment: "",
  payment_method: "cash",
  is_income: false,
  created_at: "",
  updated_at: "",
});

export const registersAtom = atom<TRegisterBack[]>([]);
