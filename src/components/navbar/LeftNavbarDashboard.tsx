import { Link } from "react-router-dom";
import "./LeftNavbarDashboard.scss";
import { CgSelect } from "react-icons/cg";
import invoiceIcon from "../../assets/images/invoice.svg";
import quoteIcon from "../../assets/images/quote.svg";
import customerIcon from "../../assets/images/customer.svg";
import dashboardIcon from "../../assets/images/dashboard.svg";

export default function LeftNavbarDashboard() {
  return (
    <nav className="left-navbar">
      <p className="left-navbar__logo">Mycompta</p>
      <div className="left-navbar__society">
        <p>SOCIETY</p>
        <CgSelect />
      </div>

      <div className="left-navbar__item">
        <Link to="/dashboard" className="index">
          <img src={dashboardIcon} alt="dashboard icon" />
          <p>Dashboard</p>
        </Link>
      </div>

      <div className="left-navbar__item">
        <Link to="/customers" className="index">
          <img src={customerIcon} alt="customer icon" />
          <p>Customers</p>
        </Link>
        <Link to="/customers/new" className="new">
          +
        </Link>
      </div>

      <div className="left-navbar__item">
        <Link to="/quotations" className="index">
          <img src={quoteIcon} alt="quote icon" />
          <p>Quotations</p>
        </Link>
        <Link to="/quotations/new" className="new">
          +
        </Link>
      </div>

      <div className="left-navbar__item">
        <Link to="/invoices" className="index">
          <img src={invoiceIcon} alt="invoice icon" />
          <p>Invoices</p>
        </Link>
        <Link to="/invoices/create" className="new">
          +
        </Link>
      </div>
    </nav>
  );
}
