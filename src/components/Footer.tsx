import { Link } from "react-router-dom";
import "./Footer.scss";
const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2024 Mycompta. All right reserved.</p>
      <div className="footer__link">
        <Link to="/cgu">Terms of use</Link>
        <Link to="/confidentiality">Confidentiality</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </footer>
  );
};

export default Footer;
