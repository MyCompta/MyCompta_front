import { atom } from "jotai";
import Cookies from "js-cookie";

export const currentSocietyAtom = atom(
  Cookies.get("currentSociety") ? JSON.parse(Cookies.get("currentSociety")!) : null
);

export const societyAtom = atom<TSocietyBack | null>(null);

export const societiesAtom = atom<TSocietyBack[]>([]);

export default societyAtom;
