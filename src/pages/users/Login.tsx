import { Form } from "../../components/forms/Form";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

import "./users.scss";

export default function Login() {
  const navigate = useNavigate();

  const handleOnSuccess = () => {
    Cookies.get("currentSociety")
      ? navigate("/dashboard")
      : navigate("/societies/create");
    //navigate("/dashboard");
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
        onSuccess={() => navigate("/dashboard")}
      />
      <Link to="/register">Register</Link>
      <Link to="/forgot-password">Forgot password</Link>
    </div>
  );
}
