import { useState } from "react";
import "./NavbarDashboard2.scss";
import { FaBell } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import tic from "../../assets/images/tic.svg";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";

const NavbarDashboard2 = () => {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfilePopupOpen(!isProfilePopupOpen);
  };

  return (
    <div className="top-navbar">
      <div className="right-box">
        <div className="right-box__notification">
          <FaBell />
        </div>
        <div className="right-box__profile" onClick={handleProfileClick}>
          <p>AL</p>
        </div>
      </div>
      {isProfilePopupOpen && <PopupProfile />}
    </div>
  );
};

export default NavbarDashboard2;

export const PopupProfile = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };
  return (
    <div className="popup-profile">
      <img src={tic} alt="tic" />
      <Link to="/profile">
        <CgProfile />
        My account
      </Link>
      <button onClick={handleLogout}>
        <LuLogOut />
        Logout
      </button>
    </div>
  );
};
