import { Link } from "react-router-dom";
import "./index.scss";
import { isLoggedIn } from "../utils/auth.js";

export default function Index() {
  return (
    !isLoggedIn() && (
      <div className="unlogged-home-container">
        <div className="unlogged-home">
          <h1>Welcome</h1>
          <div className="unlogged-home__free-services">
            <p>Simply generate an invoice or a quote straight away</p>
            <div className="unlogged-home__free-services__btns">
              <Link to="/invoices/create" className="btn">
                Invoice
              </Link>
              <Link to="/quotations/create" className="btn">
                Quote
              </Link>
            </div>
          </div>
          <div className="unlogged-home__connection">
            <p className="unlogged-home__connection-register-text">
              Or <Link to="/register">register</Link> for all options
            </p>
            <p className="unlogged-home__connection-login-text">
              Already have an account ? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    )
  );
}
