import { Form } from "../../components/forms/Form";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Login Page</h1>
      <Form
        method="POST"
        fetchUrl="users/sign_in"
        btnDisplay="Se connecter"
        fields={[
          { name: "email", displayName: "Adresse email", type: "email" },
          { name: "password", displayName: "Mot de passe", type: "password" },
        ]}
        controller="user"
        onSuccess={() => navigate("/dashboard")}
      />
      <Link to="/register">S'enregistrer</Link>
      <Link to="/forgot-password">Mot de passe oublié</Link>
    </div>
  );
}
