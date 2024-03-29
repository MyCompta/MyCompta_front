import { currentSocietyAtom } from "../../atom/societyAtom";
import { useAtomValue } from "jotai";
import { Form } from "../../components/forms/Form";
import { useNavigate } from "react-router-dom";

export default function CreateRegister() {
  const currentSociety = useAtomValue(currentSocietyAtom);
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
          { name: "payment_method", displayName: "Payment method" },
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
        onSuccess={() => navigate("/registers")}></Form>
    </>
  );
}
