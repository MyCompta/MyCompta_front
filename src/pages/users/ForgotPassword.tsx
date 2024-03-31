import { Form } from "../../components/forms/Form";
import { useSetAtom } from "jotai";
import { successAtom } from "../../atom/notificationAtom";
import { useNavigate, Link } from "react-router-dom";

import "./users.scss";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const setSuccess = useSetAtom(successAtom);
  return (
    <div className="forgotpasswordpage">
      <h1>Forgot Password Page</h1>
      <Form
        method="POST"
        fetchUrl="users/password"
        btnDisplay="Send"
        fields={[
          { name: "email", displayName: "Email Address : ", type: "email" },
        ]}
        controller="user"
        onSuccess={() => {
          setSuccess("Proceed  reinitialization password");
          navigate("/");
        }}
      />
      <div className="form-form-links">
        <Link className="form-form-link" to="/login">
          Login
        </Link>
        <Link className="form-form-link" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
}
