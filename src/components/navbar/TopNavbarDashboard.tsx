import { useEffect, useState } from "react";
import "./TopNavbarDashboard.scss";
import { FaBell } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import tic from "../../assets/images/tic.svg";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { Squash as Hamburger } from "hamburger-react";
import LeftNavbardashboard from "./LeftNavbarDashboard";

const TopNavbarDashboard = ({ onToggle }: any) => {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfilePopupOpen(!isProfilePopupOpen);
  };

  useEffect(() => {
    onToggle(isHamburgerOpen);
    console.log("isHamburgerOpen", isHamburgerOpen);
  }, [isHamburgerOpen]);

  return (
    <>
      <div className="top-navbar">
        <Hamburger toggled={isHamburgerOpen} toggle={setHamburgerOpen} />
        <p className="top-navbar__logo">MyCompta</p>
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
      <LeftNavbardashboard />
    </>
  );
};

export default TopNavbarDashboard;

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
