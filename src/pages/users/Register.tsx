import { Form } from "../../components/forms/Form";
import { Link, useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { isLoggedAtom } from "../../atom/authAtom";
import "./users.scss";
import { successAtom } from "../../atom/notificationAtom";
import { errorAtom } from "../../atom/notificationAtom";

export default function Register() {
  const navigate = useNavigate();
  const setIsLogged = useSetAtom(isLoggedAtom);
  const setSuccess = useSetAtom(successAtom);
  const setError = useSetAtom(errorAtom);

  const handleOnSuccess = () => {
    setIsLogged(true);
    setSuccess("You are registered and logged in");
    navigate("/societies/create");
  };

  const handleOnError = () => {
    setError("Invalid email or password");
  };

  return (
    <div className="registerpage">
      <h1>Create Your account</h1>
      <Form
        method="POST"
        fetchUrl="users"
        btnDisplay="Register"
        fields={[
          { name: "email", displayName: "Email address", type: "email" },
          { name: "password", displayName: "Password", type: "password" },
          {
            name: "password_confirmation",
            displayName: "Confirm password",
            type: "password",
          },
          {
            name: "cgu",
            displayName: (
              <div className="form-form-cgu">
                I have read the{" "}
                <Link
                  to="/cgu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="form-form-cgu__link"
                >
                  terms of service
                </Link>
              </div>
            ),
            type: "checkbox",
          },
        ]}
        controller="user"
        onSuccess={handleOnSuccess}
        onError={handleOnError}
      />

      <p className="already-have-an-account">
        Already have an account ? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
