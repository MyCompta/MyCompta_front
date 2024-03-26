import { Form } from "../../components/forms/Form";
import { Link, useNavigate } from "react-router-dom";

import "./users.scss";

export default function Register() {
  const navigate = useNavigate();
  return (
    <div className="registerpage">
      <h1>Register Page</h1>
      <Form
        method="POST"
        fetchUrl="users"
        btnDisplay="Register"
        fields={[
          { name: "email", displayName: "Email address : ", type: "email" },
          { name: "password", displayName: "Password : ", type: "password" },
          {
            name: "password_confirmation",
            displayName: "Confirm password : ",
            type: "password",
          },
          {
            name: "cgu",
            displayName: (
              <>
                I have read the{" "}
                <Link
                  to="/cgu"
                  style={{ color: "blue" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  terms of service
                </Link>
              </>
            ),
            type: "checkbox",
          },
        ]}
        controller="user"
        onSuccess={() => navigate("/societies/create")}
      />
    </div>
  );
}
