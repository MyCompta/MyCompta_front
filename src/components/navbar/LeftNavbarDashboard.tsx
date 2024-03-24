import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LeftNavbarDashboard.scss";
import { CgSelect } from "react-icons/cg";
import invoiceIcon from "../../assets/images/invoice.svg";
import quoteIcon from "../../assets/images/quote.svg";
import customerIcon from "../../assets/images/customer.svg";
import dashboardIcon from "../../assets/images/dashboard.svg";
import { FaBell } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { newClientModalStatusAtom } from "../../atom/modalAtom";
import { societyModalStatusAtom } from "../../atom/modalAtom";
import fetcher from "../../utils/fetcher";

export default function LeftNavbarDashboard() {
  const [currentUserData, setCurrentUserData] = useState();
  const navigate = useNavigate();
  const [newClientModalStatus, setNewClientModalStatus] = useAtom(
    newClientModalStatusAtom
  );
  const [societyModalStatus, setSocietyModalStatus] = useAtom(
    societyModalStatusAtom
  );

  const id = Cookies.get("token")
    ? JSON.parse(Cookies.get("token")).user_id
    : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher(`users/${id}`, undefined, "GET", true);
        if (!response.error) {
          setCurrentUserData(response);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error("Erreur lors de la sélection des données :", error);
      }
    };

    Cookies.get("token") && fetchData();
  }, [id]);

  useEffect(() => {
    console.log("currentUserData", currentUserData);
  }, [currentUserData]);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("currentSociety");
    navigate("/");
  };

  const handleOpenNewClientModal = () => {
    setNewClientModalStatus(true);
  };

  const handleOpenSocietyModal = () => {
    setSocietyModalStatus(true);
  };

  return (
    <>
      <nav className="left-navbar">
        <p className="left-navbar__logo">Mycompta</p>
        {Cookies.get("token") && (
          <div className="left-navbar__profile-options">
            <div className="profile-icon">
              <p>AL</p>
            </div>
            <div className="notification">
              <FaBell />
            </div>
            <Link to="/profile" className="profile-link">
              <CgProfile />
            </Link>
            <div className="logout-icon" onClick={handleLogout}>
              <LuLogOut />
            </div>
          </div>
        )}

        {Cookies.get("token") && (
          <div
            className="left-navbar__society"
            onClick={handleOpenSocietyModal}
          >
            <p>
              {currentUserData &&
              currentUserData.societies &&
              currentUserData.societies.find(
                (society) =>
                  society.id === parseInt(Cookies.get("currentSociety"))
              )
                ? currentUserData.societies.find(
                    (society) =>
                      society.id === parseInt(Cookies.get("currentSociety"))
                  ).name
                : currentUserData &&
                  currentUserData.societies &&
                  currentUserData.societies.length > 0
                ? (() => {
                    const selectedSociety = currentUserData.societies[0];
                    Cookies.set("currentSociety", selectedSociety.id);
                    return selectedSociety.name;
                  })()
                : "Select society"}
            </p>
            <CgSelect />
          </div>
        )}
        <div className="left-navbar__item">
          <Link to="/dashboard" className="index">
            <img src={dashboardIcon} alt="dashboard icon" />
            <p>Dashboard</p>
          </Link>
        </div>
        <div className="left-navbar__item">
          <Link to="/clients" className="index">
            <img src={customerIcon} alt="customer icon" />
            <p>Clients</p>
          </Link>
          <div onClick={handleOpenNewClientModal} className="new">
            +
          </div>
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
        {!Cookies.get("token") && (
          <div className="left-navbar__connection">
            <Link
              to="/register"
              className="left-navbar__connection-link left-navbar__connection--blue"
            >
              Register
            </Link>
            <Link to="/login" className="left-navbar__connection-link">
              Login
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
