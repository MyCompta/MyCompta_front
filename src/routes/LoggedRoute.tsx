import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export default function LoggedRoute({ redirectPath = "/login" }: { redirectPath: string }) {
  const token = Cookies.get("token");
  if (!token || !JSON.parse(token).token) return <Navigate to={redirectPath} />;

  return <Outlet />;
}
