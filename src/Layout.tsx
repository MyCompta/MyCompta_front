import { Outlet, matchPath, useLocation } from "react-router-dom";
import NavbarLanding from "./components/navbar/NavbarLanding";
import NavbarDashboard from "./components/navbar/NavbarDashboard";
import Error from "./components/notifications/Error";
import Success from "./components/notifications/Success";

export default function Layout() {
  const location = useLocation();
  const isDashboardRoute = matchPath(
    { path: "/dashboard/*" },
    location.pathname
  );

  return (
    <>
      {isDashboardRoute ? <NavbarDashboard /> : <NavbarLanding />}
      <main>
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
