import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Mycompta - landing</h1>
      </div>
      <div className="links">
        <Link to="/login">Se connecter</Link>
        <Link to="/register">Commencer maintenant</Link>
      </div>
    </nav>
  );
}
