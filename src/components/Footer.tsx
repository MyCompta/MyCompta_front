import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2024 Mycompta. All right reserved.</p>
      <Link to="/cgu">Terms of use</Link>
      <Link to="/contact">Contact</Link>
    </footer>
  );
};

export default Footer;
