import { useState } from "react";
import { Outlet, matchPath, useLocation, Link } from "react-router-dom";
import NavbarLanding from "./components/navbar/NavbarLanding";
import TopNavbarDashboard from "./components/navbar/TopNavbarDashboard";
import Error from "./components/notifications/Error";
import Success from "./components/notifications/Success";
import ModalClient from "./components/clients/ModalClient";
import ModalSociety from "./components/society/ModalSociety";
import Footer from "./components/Footer";
import { useAtom } from "jotai";
import { newClientModalStatusAtom } from "./atom/modalAtom";
import { societyModalStatusAtom } from "./atom/modalAtom";

import "./styles/global.scss";

export default function Layout() {
  const location = useLocation();
  const [isHamburgerOpen, setHamburgerOpen] = useState();
  const [newClientModalStatus, setNewClientModalStatus] = useAtom(
    newClientModalStatusAtom
  );
  const [societyModalStatus, setSocietyModalStatus] = useAtom(
    societyModalStatusAtom
  );

  const handleHamburger = (toggle) => {
    setHamburgerOpen(toggle);
  };

  const isDashboardRoute = matchPath(
    { path: "/dashboard/*" },
    location.pathname
  );

  return (
    <>
      {/*}
      {isDashboardRoute ? <NavbarDashboard /> : <NavbarLanding />}
    */}
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
