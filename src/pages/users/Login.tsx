import { Form } from "../../components/forms/Form";
import { useNavigate, Link } from "react-router-dom";
import fetcher from "../../utils/fetcher";
import { useEffect } from "react";

import "./users.scss";

export default function Login() {
  const navigate = useNavigate();

  const checkUserSocieties = async () => {
    try {
      const response = await fetcher(`societies`, undefined, "GET", true);
      if (!response.error) {
        const { data } = response;
        if (data && data.societies.length > 0) {
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
    checkUserSocieties();
  };

  return (
    <div className="loginpage">
      <h1>Login Page</h1>
      <Form
        method="POST"
        fetchUrl="users/sign_in"
        btnDisplay="Login"
        fields={[
          { name: "email", displayName: "Email address : ", type: "email" },
          { name: "password", displayName: "Password : ", type: "password" },
        ]}
        controller="user"
        onSuccess={handleOnSuccess}
      />
      <Link to="/register">Register</Link>
      <Link to="/forgot-password">Forgot password</Link>
    </div>
  );
}
