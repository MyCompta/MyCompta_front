import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LeftNavbarDashboard.scss";
import { CgSelect } from "react-icons/cg";
import invoiceIcon from "../../assets/images/invoice.svg";
import quoteIcon from "../../assets/images/quote.svg";
import customerIcon from "../../assets/images/customer.svg";
import dashboardIcon from "../../assets/images/dashboard.svg";
import registersIcon from "../../assets/images/registers.svg";
import { FaBell } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import Cookies from "js-cookie";
import { newClientModalStatusAtom } from "../../atom/modalAtom";
import { societyModalStatusAtom } from "../../atom/modalAtom";
import fetcher from "../../utils/fetcher";
import { isLoggedIn } from "../../utils/auth";
import { useAtom, useSetAtom } from "jotai";
import { isLoggedAtom } from "../../atom/authAtom";
import { currentUserSocietiesAtom } from "../../atom/societyAtom";
import { currentSocietyAtom } from "../../atom/societyAtom";
import { IoPersonCircleSharp } from "react-icons/io5";

export default function LeftNavbarDashboard() {
  const [, setCurrentUserData] = useState<TUserShowBack>();
  const navigate = useNavigate();
  const setNewClientModalStatus = useSetAtom(newClientModalStatusAtom);
  const setSocietyModalStatus = useSetAtom(societyModalStatusAtom);
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom);
  const [currentSociety, setCurrentSociety] = useAtom(currentSocietyAtom);
  const [currentUserSocieties, setCurrentUserSocieties] = useAtom(
    currentUserSocietiesAtom
  );

  const id = Cookies.get("token") ? JSON.parse(Cookies.get("token")!).user_id : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher(`users/${id}`, undefined, "GET", true);
        if (!response.error) {
          setCurrentUserData(response);
          setCurrentUserSocieties(response.societies);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error("Erreur lors de la sélection des données :", error);
      }
    };

    Cookies.get("token") && fetchData();
  }, [id, setCurrentUserSocieties]);

  useEffect(() => {
    console.log("currentUserSocieties", currentUserSocieties);
  }, [currentUserSocieties]);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("currentSociety");
    setIsLogged(false);
    setCurrentSociety(null);
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
              <IoPersonCircleSharp />
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

        {isLogged && (
          <div className="left-navbar__society" onClick={handleOpenSocietyModal}>
            <p>
<<<<<<< Updated upstream
              {currentUserSocieties &&
                (currentUserSocieties.find(
                  (society) => society.id === currentSociety
                )
                  ? currentUserSocieties.find(
                      (society) => society.id === currentSociety
                    )?.name
                  : currentUserSocieties.length > 0
                  ? (() => {
                      const selectedSociety = currentUserSocieties[0];
                      Cookies.set("currentSociety", String(selectedSociety.id));
                      setCurrentSociety(selectedSociety.id);
                      return selectedSociety.name;
                    })()
                  : "Select society")}
=======
              {userSocieties &&
                (userSocieties.find((society) => society.id === currentSociety)
                  ? userSocieties.find((society) => society.id === currentSociety)?.name
                  : userSocieties.length > 0
                    ? (() => {
                        const selectedSociety = userSocieties[0];
                        Cookies.set("currentSociety", String(selectedSociety.id));
                        setCurrentSociety(selectedSociety.id);
                        return selectedSociety.name;
                      })()
                    : "Select society")}
>>>>>>> Stashed changes
            </p>
            <CgSelect />
          </div>
        )}

        <div className={`left-navbar__item ${isLoggedIn() ? "" : "left-navbar__item--disabled"}`}>
          <Link to="/dashboard" className="index">
            <img src={dashboardIcon} alt="dashboard icon" />
            <p>Dashboard</p>
          </Link>
        </div>
        <div className={`left-navbar__item ${isLoggedIn() ? "" : "left-navbar__item--disabled"}`}>
          <Link to="/clients" className="index">
            <img src={customerIcon} alt="customer icon" />
            <p>Clients</p>
          </Link>
          {isLoggedIn() && (
            <div onClick={handleOpenNewClientModal} className="new">
              +
            </div>
          )}
        </div>
        <div className="left-navbar__item">
          <Link to="/quotations" className="index">
            <img src={quoteIcon} alt="quote icon" />
            <p>Quotations</p>
          </Link>
          <Link to="/quotations/create" className="new">
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
        <div className="left-navbar__item">
          <Link to="/registers" className="index">
            <img src={registersIcon} alt="registers icon" />
            <p>Registers</p>
          </Link>
          <Link to="/registers/create" className="new">
            +
          </Link>
        </div>
        {!isLogged && (
          <div className="left-navbar__connection">
            <Link
              to="/register"
              className="left-navbar__connection-link left-navbar__connection--blue">
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
