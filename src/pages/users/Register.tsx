import { Form } from "../../components/forms/Form";
import { useNavigate } from "react-router-dom";

import CGUcheck from './CGUcheck.jsx'

export default function Register() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Register Page</h1>
      <Form
        method="POST"
        fetchUrl="users"
        btnDisplay="S'inscrire"
        fields={[
          { name: "email", displayName: "Adresse email", type: "email" },
          { name: "password", displayName: "Mot de passe", type: "password" },
          {
            name: "password_confirmation",
            displayName: "Confirmer le mot de passe",
            type: "password",
          },
          {
            name: "cgu",
            displayName: "I have read the CGU",
            type: "checkbox",
            component: <CGUcheck />,
          },
        ]}
        controller="user"
        onSuccess={() => navigate("/dashboard")}
      />

      
    </div>
  );
}
