import { atom } from "jotai";
import Cookies from "js-cookie";

export const currentSocietyAtom = atom(
  Cookies.get("currentSociety")
    ? JSON.parse(Cookies.get("currentSociety")!)
    : null
);

const societyAtom = atom<TSocietyBack>({
  id: 0,
  name: "",
  address: "",
  zip: 0,
  city: "",
  country: "",
  siret: 0,
  status: "",
  capital: 0,
  email: "",
  user_id: 0,
  created_at: "",
  updated_at: "",
} as TSocietyBack);

export const societiesAtom = atom<TSocietyBack[]>([]);

export default societyAtom;
