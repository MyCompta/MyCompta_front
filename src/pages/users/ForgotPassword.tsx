import { Form } from "../../components/forms/Form";
import { useSetAtom } from "jotai";
import { successAtom } from "../../atom/notificationAtom";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const setSuccess = useSetAtom(successAtom);
  return (
    <div>
      <h1>ForgotPassword Page</h1>
      <Form
        method="POST"
        fetchUrl="users/password"
        btnDisplay="Envoyer"
        fields={[{ name: "email", displayName: "Adresse email", type: "email" }]}
        controller="user"
        onSuccess={() => {
          setSuccess("Procédure de reinitialisation de mot de passe envoyée");
          navigate("/");
        }}
      />
    </div>
  );
}
