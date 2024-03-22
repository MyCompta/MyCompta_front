import { useState } from "react";
import { Outlet, matchPath, useLocation, Link } from "react-router-dom";
import NavbarLanding from "./components/navbar/NavbarLanding";
import TopNavbarDashboard from "./components/navbar/TopNavbarDashboard";
import Error from "./components/notifications/Error";
import Success from "./components/notifications/Success";
import ModalClientNew from "./components/clients/ModalClientNew";
import { useAtom } from "jotai";
import { newClientModalStatusAtom } from "./atom/modalAtom";

import "./styles/global.scss";

export default function Layout() {
  const location = useLocation();
  const [isHamburgerOpen, setHamburgerOpen] = useState();
  const [newClientModalStatus, setNewClientModalStatus] = useAtom(
    newClientModalStatusAtom
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
        <footer className="footer">
          <p>© 2024 Mycompta. All right reserved.</p>
          <Link to="/cgu">Terms of use</Link>
        </footer>
      </main>
      {newClientModalStatus && <ModalClientNew />}
      <Error />
      <Success />
    </>
  );
}
