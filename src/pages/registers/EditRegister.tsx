import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import fetcher from "../../utils/fetcher";
import { Form } from "../../components/forms/Form";
import { useSetAtom } from "jotai";
import { successAtom } from "../../atom/notificationAtom";

export default function EditRegister() {
  const location = useLocation();
  const navigate = useNavigate();
  const setSuccess = useSetAtom(successAtom);
  const state = location.state;
  let registerState;
  if (state && state.registerState) {
    registerState = state.registerState;
  }
  const { id } = useParams();
  const [register, setRegister] = useState<TRegisterBack>(registerState);

  useEffect(() => {
    const fetchRegister = async () => {
      fetcher(`registers/${id}`, undefined, "GET", true)
        .then((res: TRegisterBack) => setRegister(res))
        .catch((err) => console.error(err));
    };
    if (!register) {
      fetchRegister();
    }
  }, [id, register]);

  return (
    <>
      {register ? (
        <div>
          <Form
            method="PUT"
            fetchUrl={`registers/${id}`}
            controller="register"
            btnDisplay="Update Register"
            isLogged={true}
            fields={[
              { name: "title", displayName: "Title", value: register.title },
              { name: "comment", displayName: "Comment", optional: true, value: register.comment },
              { name: "amount", displayName: "Amount", value: register.amount.toString() },
              {
                name: "payment_method",
                displayName: "Payment method",
                type: "select",
                value: register.payment_method,
                select: {
                  options: [
                    { name: "cash", displayName: "Cash" },
                    { name: "card", displayName: "Card" },
                    { name: "cheque", displayName: "Cheque" },
                    { name: "transfer", displayName: "Transfer" },
                    { name: "other", displayName: "Other" },
                  ],
                },
              },
            ]}
          />
        </div>
      ) : (
        "Register not found"
      )}
      <button
        className="btn btn--alert"
        onClick={() =>
          window.confirm("Are you sure you want to delete this register?") &&
          fetcher("registers/" + id, undefined, "DELETE", true).then(() => {
            setSuccess("Register deleted successfully");
            navigate("/registers");
          })
        }>
        Delete register
      </button>
    </>
  );
}
