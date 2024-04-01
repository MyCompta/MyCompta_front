import Invoice from "../../components/invoice/Invoice";
import "../invoices/Invoice.css";

export default function QuotationCreation() {
  return <Invoice isPublic={true} category="quotation" />;
}
