import { useState } from "react";
import { Outlet, matchPath, useLocation } from "react-router-dom";
import NavbarLanding from "./components/navbar/NavbarLanding";
import TopNavbarDashboard from "./components/navbar/TopNavbarDashboard";
import Error from "./components/notifications/Error";
import Success from "./components/notifications/Success";

export default function Layout() {
  const location = useLocation();
  const [isHamburgerOpen, setHamburgerOpen] = useState();

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
        <footer>
          <p>© 2024 Mycompta. Tous droits réservés.</p>
        </footer>
      </main>
      <Error />
      <Success />
    </>
  );
}
