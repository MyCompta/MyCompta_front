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
      <h1>Mycompta</h1>
      <div className="left-navbar__society">
        <p>SOCIETY</p>
        <CgSelect />
      </div>

      <Link to="/dashboard">
        <div className="left-navbar__item">
          <img src={dashboardIcon} alt="dashboard icon" />
          <p>Dashboard</p>
        </div>
      </Link>
      <Link to="/customers">
        <div className="left-navbar__item">
          <img src={customerIcon} alt="customer icon" />
          <p>Customers</p>
          <Link to="/customers/new">+</Link>
        </div>
      </Link>
      <Link to="/quotations">
        <div className="left-navbar__item">
          <img src={quoteIcon} alt="quote icon" />
          <p>Quotations</p>
          <Link to="/quotations/new">+</Link>
        </div>
      </Link>
      <Link to="/invoices">
        <div className="left-navbar__item">
          <img src={invoiceIcon} alt="invoice icon" />
          <p>Invoices</p>
          <Link to="/invoices/new">+</Link>
        </div>
      </Link>
    </nav>
  );
}
