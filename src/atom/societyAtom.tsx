import { atom } from "jotai";
import Cookies from "js-cookie";

export const currentSocietyAtom = atom(
  Cookies.get("currentSociety") ? JSON.parse(Cookies.get("currentSociety")!) : null
);

<<<<<<< HEAD
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
=======
export const societyAtom = atom<TSocietyBack | null>(null);
>>>>>>> 4a10b12c606909ac83b3aa4c578660b76b6127ac

export const societiesAtom = atom<TSocietyBack[]>([]);

export default societyAtom;
