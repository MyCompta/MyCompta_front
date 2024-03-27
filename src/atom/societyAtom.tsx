import { atom } from "jotai";
import Cookies from "js-cookie";

export const currentSocietyAtom = atom(
  Cookies.get("currentSociety") ? JSON.parse(Cookies.get("currentSociety")!) : null
);

const societyAtom = atom({
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
});

export default societyAtom;
