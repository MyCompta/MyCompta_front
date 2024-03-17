import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Form } from "../../components/forms/Form";
import { useSetAtom } from "jotai";
import { successAtom } from "../../atom/notificationAtom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reset_token = searchParams.get("reset_token");
  const setSuccess = useSetAtom(successAtom);

  useEffect(() => {
    if (!reset_token) {
      navigate("/");
    }
  }, [reset_token, navigate]);

  return (
    <div>
      <h1>Reset password Page</h1>
      {reset_token && (
        <Form
          method="PATCH"
          fetchUrl="users/password"
          btnDisplay="Envoyer"
          fields={[
            { name: "reset_password_token", type: "hidden", value: reset_token },
            { name: "password", displayName: "Mot de passe", type: "password" },
            {
              name: "password_confirmation",
              displayName: "Confirmer le mot de passe",
              type: "password",
            },
          ]}
          controller="user"
          onSuccess={() => {
            setSuccess("Mot de passe mis à jour");
            navigate("/login");
          }}
        />
      )}
    </div>
  );
}
