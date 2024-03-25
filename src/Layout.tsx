import { useState } from "react";
import { Outlet } from "react-router-dom";
// import NavbarLanding from "./components/navbar/NavbarLanding";
import TopNavbarDashboard from "./components/navbar/TopNavbarDashboard";
import Error from "./components/notifications/Error";
import Success from "./components/notifications/Success";
import ModalClient from "./components/clients/ModalClient";
import ModalSociety from "./components/society/ModalSociety";
import Footer from "./components/Footer";
import { useAtomValue } from "jotai";
import { newClientModalStatusAtom } from "./atom/modalAtom";
import { societyModalStatusAtom } from "./atom/modalAtom";

import "./styles/global.scss";

export default function Layout() {
  const [isHamburgerOpen, setHamburgerOpen] = useState<boolean>();
  const newClientModalStatus = useAtomValue(newClientModalStatusAtom);
  const societyModalStatus = useAtomValue(societyModalStatusAtom);

  const handleHamburger = (toggle: boolean) => {
    setHamburgerOpen(toggle);
  };

  return (
    <>
      <TopNavbarDashboard onToggle={handleHamburger} />
      <main className={isHamburgerOpen ? "hamburger-opened" : ""}>
        <Outlet />
        <Footer />

      </main>
      {newClientModalStatus && <ModalClient />}
      {societyModalStatus && <ModalSociety />}
      <Error />
      <Success />
    </>
  );
}
