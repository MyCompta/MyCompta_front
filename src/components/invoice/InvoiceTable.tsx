import { useState, useEffect } from "react";
import "./InvoiceTable.scss";
import fetcher from "../../utils/fetcher";
import { useNavigate, Link } from "react-router-dom";
import { formatDate2 } from "../../utils/date";
import { useAtom } from "jotai";
import { currentSocietyAtom } from "../../atom/societyAtom";

const InvoiceTable = () => {
  const [invoicesData, setInvoicesData] = useState([]);
  const [currentTab, setCurrentTab] = useState("all");
  const navigate = useNavigate();
  const [currentSociety] = useAtom(currentSocietyAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher(
          "/invoices?society_id=" + currentSociety,
          undefined,
          "GET",
          true
        );
        if (!response.error) {
          setInvoicesData(response);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, [currentSociety]);

  useEffect(() => {
    console.log("invoicesData", invoicesData);
  }, [invoicesData]);

  const handleLineClick = (invoiceId: number) => {
    navigate(`/invoices/${invoiceId}`);
  };

  const filterInvoicesByStatus = (status: string) => {
    if (status === "drafts") {
      return invoicesData.filter(
        (invoice: TInvoiceGetBack) => invoice.is_draft === true
      );
    }
    if (status === "outstanding") {
      return invoicesData.filter(
        (invoice: TInvoiceGetBack) => new Date(invoice.due_date) > new Date()
      );
    }
    if (status === "past_due") {
      return invoicesData.filter(
        (invoice: TInvoiceGetBack) => new Date(invoice.due_date) < new Date()
      );
    }
    if (status === "paid") {
      return invoicesData.filter(
        (invoice: TInvoiceGetBack) => invoice.is_paid === true
      );
    }
    return invoicesData;
  };

  return (
    <>
      <div className="invoice-table-header">
        <h1>Invoices</h1>
        <div className="invoice-table-header__filters">
          <button onClick={() => setCurrentTab("all")}>All</button>
          <button onClick={() => setCurrentTab("drafts")}>Drafts</button>
          <button onClick={() => setCurrentTab("outstanding")}>
            Outstanding
          </button>
          <button onClick={() => setCurrentTab("past_due")}>Past Due</button>
          <button onClick={() => setCurrentTab("paid")}>Paid</button>
        </div>
        <Link to="/invoices/create">
          <button className="invoice-table-header__btn btn">
            Create Invoice
          </button>
        </Link>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>INVOICE</th>
            <th>CUSTOMER</th>
            <th>DATE</th>
            <th>EXPECTED PAYMENT DATE</th>
            <th>TOTAL</th>
            <th>BALANCE</th>
          </tr>
        </thead>
        <tbody>
          {filterInvoicesByStatus(currentTab).length > 0 ? (
            filterInvoicesByStatus(currentTab).map(
              (invoice: TInvoiceGetBack) => (
                <tr
                  key={invoice.id}
                  onClick={() => handleLineClick(invoice.id!)}
                >
                  <td>{invoice.id}</td>
                  <td>CUSTOMER NAME</td>
                  <td>{formatDate2(invoice.date)}</td>
                  <td>{formatDate2(invoice.due_date)}</td>
                  <td>{invoice.total}</td>
                  <td>BALANCE</td>
                </tr>
              )
            )
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
