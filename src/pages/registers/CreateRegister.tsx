import { currentSocietyAtom } from "../../atom/societyAtom";
import { useAtomValue, useSetAtom } from "jotai";
import { Form } from "../../components/forms/Form";
import { useNavigate } from "react-router-dom";
import { successAtom } from "../../atom/notificationAtom";

export default function CreateRegister() {
  const currentSociety = useAtomValue(currentSocietyAtom);
  const setSuccess = useSetAtom(successAtom);
  const navigate = useNavigate();
  return (
    <>
      <Form
        method="POST"
        fetchUrl="registers"
        controller="register"
        btnDisplay="Create Register"
        fields={[
          { name: "title", displayName: "Title" },
          { name: "comment", displayName: "Comment", optional: true },
          { name: "amount", displayName: "Amount" },
          {
            name: "payment_method",
            displayName: "Payment method",
            type: "select",
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
          {
            name: "is_income",
            displayName: "Is the register an income?",
            type: "checkbox",
            value: "true",
          },
          {
            name: "paid_at",
            displayName: "Date of payment",
            type: "date",
            value: new Date().toISOString().substring(0, 10),
          },
          { name: "society_id", value: currentSociety, type: "hidden" },
        ]}
        onSuccess={() => {
          setSuccess("Register created successfully");
          navigate("/registers");
        }}></Form>
    </>
  );
}
