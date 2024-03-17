import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1>Mycompta - dashboard</h1>
      <button onClick={logout}>Se deconnecter</button>
    </nav>
  );
}
