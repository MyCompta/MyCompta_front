import "../invoices/Invoice.css";
import Invoice from "../../components/invoice/Invoice";

export default function QuotationCreate() {
  return (
    <div>
      <h1>Create Quotation</h1>
      <Invoice category="quotation" />
    </div>
  );
}
