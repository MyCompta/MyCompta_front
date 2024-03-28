import { useState } from "react";
import "./InvoiceTable.scss";
import { useNavigate, Link } from "react-router-dom";
import { formatDate2 } from "../../utils/date";

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

  return (
    <>
      <div className="invoice-table-header">
        <h1 style={{ textTransform: "capitalize" }}>{category + "s"}</h1>
        <div className="invoice-table-header__filters">
          <button onClick={() => setCurrentTab("all")}>All</button>
          <button onClick={() => setCurrentTab("drafts")}>Drafts</button>
          <button onClick={() => setCurrentTab("outstanding")}>Outstanding</button>
          <button onClick={() => setCurrentTab("past_due")}>Past Due</button>
          <button onClick={() => setCurrentTab("paid")}>Paid</button>
        </div>
        <Link to="/invoices/create">
          <button className="invoice-table-header__btn btn">Create {category}</button>
        </Link>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
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
                <td>{invoice.number}</td>
                <td>
                  {invoice.client.is_pro
                    ? invoice.client.business_name
                    : invoice.client.first_name + " " + invoice.client.last_name}
                </td>
                <td>{formatDate2(invoice.issued_at)}</td>
                <td>{formatDate2(invoice.due_at)}</td>
                <td>{invoice.total}</td>
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
