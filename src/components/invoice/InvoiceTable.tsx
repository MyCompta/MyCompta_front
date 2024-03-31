import { useState } from "react";
import "./InvoiceTable.scss";
import { useNavigate, Link } from "react-router-dom";
// import { formatDate2 } from "../../utils/date";
import { FiAlertTriangle } from "react-icons/fi";

const InvoiceTable = ({
  invoicesData,
  category = "invoice",
}: {
  invoicesData: TInvoiceGetBack[];
  category?: "invoice" | "quotation";
}) => {
  const [currentTab, setCurrentTab] = useState("all");
  const navigate = useNavigate();

  const handleLineClick = (invoiceId: number) => {
    navigate(`/${category}s/${invoiceId}`);
  };

  const filterInvoicesByStatus = (status: string) => {
    if (status === "drafts") {
      return invoicesData.filter((invoice: TInvoiceGetBack) => invoice.is_draft === true);
    }
    if (status === "outstanding") {
      return invoicesData.filter(
        (invoice: TInvoiceGetBack) => new Date(invoice.due_at) > new Date()
      );
    }
    if (status === "past_due") {
      return invoicesData.filter(
        (invoice: TInvoiceGetBack) => new Date(invoice.due_at) < new Date()
      );
    }
    if (status === "paid") {
      return invoicesData.filter((invoice: TInvoiceGetBack) => invoice.is_paid === true);
    }
    return invoicesData;
  };

  const is_latePaymnent = (invoice: TInvoiceGetBack) => {
    if (new Date(invoice.due_at) < new Date() && !invoice.is_paid && !invoice.is_draft) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="invoice-table-header">
        <h1 style={{ textTransform: "capitalize" }}>{category + "s"}</h1>
        <Link to="/invoices/create">
          <button className="invoice-table-header__btn btn">Create {category}</button>
        </Link>
      </div>

      <div className="invoice-table-filters">
        <button
          onClick={() => setCurrentTab("all")}
          className={currentTab === "all" ? "selected" : ""}>
          All
        </button>
        <button
          onClick={() => setCurrentTab("drafts")}
          className={currentTab === "drafts" ? "selected" : ""}>
          Drafts
        </button>
        <button
          onClick={() => setCurrentTab("outstanding")}
          className={currentTab === "outstanding" ? "selected" : ""}>
          Outstanding
        </button>
        <button
          onClick={() => setCurrentTab("past_due")}
          className={currentTab === "past_due" ? "selected" : ""}>
          Past Due
        </button>
        <button
          onClick={() => setCurrentTab("paid")}
          className={currentTab === "paid" ? "selected" : ""}>
          Paid
        </button>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th></th>
            <th style={{ textTransform: "uppercase" }}>{category}</th>
            <th>CUSTOMER</th>
            <th>DATE</th>
            <th>EXPECTED PAYMENT DATE</th>
            <th>TOTAL</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {filterInvoicesByStatus(currentTab).length > 0 ? (
            filterInvoicesByStatus(currentTab).map((invoice: TInvoiceGetBack) => (
              <tr key={invoice.id} onClick={() => handleLineClick(invoice.id!)}>
                <td>{is_latePaymnent(invoice) && <FiAlertTriangle title="Late payment" />}</td>
                <td>#{invoice.number}</td>
                <td>
                  {invoice.client.is_pro
                    ? invoice.client.business_name
                    : invoice.client.first_name + " " + invoice.client.last_name}
                </td>
                <td>{new Date(invoice.issued_at).toLocaleDateString()}</td>
                <td>{new Date(invoice.due_at).toLocaleDateString()}</td>
                <td>
                  {invoice.total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  €
                </td>
                <td>{invoice.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="invoice-table__no-invoices">
                No invoices found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default InvoiceTable;
