import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarDashboard.scss";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <nav className="left-navbar">
      <h1>Mycompta - dashboard</h1>
      <p>SOCIETY</p>
      <Link to="/dashboard">
        <div className="left-navbar__item">
          <p>Dashboard</p>
        </div>
      </Link>
      <Link to="/customers">
        <div className="left-navbar__item">
          <p>Customers</p>
          <Link to="/customers/new">+</Link>
        </div>
      </Link>
      <Link to="/quotations">
        <div>
          <p>Quotations</p>
          <Link to="/quotations/new">+</Link>
        </div>
      </Link>
      <Link to="/invoices">
        <div>
          <p>Invoices</p>
          <Link to="/invoices/new">+</Link>
        </div>
      </Link>
      <button onClick={logout}>Se deconnecter</button>
    </nav>
  );
}
