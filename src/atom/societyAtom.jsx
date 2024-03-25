import { atom } from "jotai";

export const currentSocietyAtom = atom();

const societyAtom = atom({
  id: "",
  name: "",
  adress: "",
  zip: "",
  city: "",
  country: "",
  siret: "",
  status: "",
  capital: "",
  email: "",
});

export default societyAtom;
