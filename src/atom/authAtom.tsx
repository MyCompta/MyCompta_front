import { atom } from "jotai";
import Cookies from "js-cookie";

export const isLoggedAtom = atom(Cookies.get("token") ? true : false);
