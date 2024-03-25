import { useEffect, useState, useRef } from "react";
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
  const profilePopupRef = useRef(null);

  const handleProfileClick = (event) => {
    event.stopPropagation();
    setIsProfilePopupOpen(!isProfilePopupOpen);
  };

  const handleAutoCloseProfilPopup = () => {
    setIsProfilePopupOpen(false);
  };

  useEffect(() => {
    const handleClickOutsideProfilePopup = (event) => {
      if (
        profilePopupRef.current &&
        !profilePopupRef.current.contains(event.target)
      ) {
        setIsProfilePopupOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutsideProfilePopup);
    return () => {
      document.removeEventListener("click", handleClickOutsideProfilePopup);
    };
  }, [profilePopupRef]);

  useEffect(() => {
    onToggle(isHamburgerOpen);
  }, [isHamburgerOpen]);

  return (
    <>
      <div className="top-navbar">
        <Hamburger toggled={isHamburgerOpen} toggle={setHamburgerOpen} />
        <div className="top-navbar__logo">
          <Link to="/dashboard"><p>My<span>C</span>ompta</p></Link>
        </div>

        {Cookies.get("token") ? (
          <div className="right-box">
            <div className="right-box__notification">
              <FaBell />
            </div>
            <div className="right-box__profile" onClick={handleProfileClick}>
              <p>AL</p>
            </div>
          </div>
        ) : (
          <div className="right-box">
            <Link to="/login" className="right-box__login">
              Login
            </Link>
            <Link to="/register" className="right-box__register">
              Register
            </Link>
          </div>
        )}

        {isProfilePopupOpen && (
          <PopupProfile
            onCloseProfilPopup={handleAutoCloseProfilPopup}
            profilePopupRef={profilePopupRef}
          />
        )}
      </div>
      <LeftNavbardashboard />
    </>
  );
};

export default TopNavbarDashboard;

export const PopupProfile = ({ onCloseProfilPopup, profilePopupRef }: any) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("currentSociety");
    onCloseProfilPopup();
    navigate("/");
  };

  return (
    <div className="popup-profile" ref={profilePopupRef}>
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
