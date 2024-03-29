import { Form } from "../../components/forms/Form";
import { useNavigate, Link } from "react-router-dom";
import fetcher from "../../utils/fetcher";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { isLoggedAtom } from "../../atom/authAtom";
import { currentSocietyAtom } from "../../atom/societyAtom";
import Cookies from "js-cookie";

import "./users.scss";

export default function Login() {
  const navigate = useNavigate();
  const setIsLogged = useSetAtom(isLoggedAtom);
  const setCurrentSociety = useSetAtom(currentSocietyAtom);

  const checkUserSocieties = async () => {
    try {
      const response = await fetcher(`societies`, undefined, "GET", true);
      console.log("response", response);
      if (!response.error) {
        setIsLogged(true);
        console.log("response scoieties", response);
        if (response && response.length > 0) {
          setCurrentSociety(response[0].id);
          navigate("/dashboard");
        } else {
          navigate("/societies/create");
        }
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Error checking user societies:", error);
    }
  };

  useEffect(() => {
    checkUserSocieties();
  });

  const handleOnSuccess = () => {
    console.log("handleSuccess", Cookies.get("token"));
    checkUserSocieties();
  };

  return (
    <div className="loginpage">
      <h1>Log into Your Account</h1>
      <Form
        method="POST"
        fetchUrl="users/sign_in"
        btnDisplay="Login"
        fields={[
          { name: "email", displayName: "Email address", type: "email" },
          { name: "password", displayName: "Password", type: "password" },
        ]}
        controller="user"
        onSuccess={handleOnSuccess}
      />
      <Link to="/register" className="form-form-link">
        Register
      </Link>
      <Link to="/forgot-password" className="form-form-link">
        Forgot password
      </Link>
    </div>
  );
}
