import { atom } from "jotai";
import Cookies from "js-cookie";

export const currentSocietyAtom = atom(
  Cookies.get("currentSociety")
    ? JSON.parse(Cookies.get("currentSociety")!)
    : null
);

export const societyAtom = atom<TSocietyBack>({
  id: "",
  name: "",
  address: "",
  zip: "",
  city: "",
  country: "",
  siret: "",
  status: "",
  capital: "",
  email: "",
  user_id: '',
});

export const societiesAtom = atom<TSocietyBack[]>([]);

export default societyAtom;
