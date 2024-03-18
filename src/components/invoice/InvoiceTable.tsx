import { useState, useEffect } from "react";
import "./InvoiceTable.scss";
import fetcher from "../../utils/fetcher";
import { useNavigate } from "react-router-dom";
import { formatDate2 } from "../../utils/date";

const InvoiceTable = () => {
  const [invoicesData, setInvoicesData] = useState([]);
  const [currentTab, setCurrentTab] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher("/invoices", undefined, "GET");
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
  }, []);

  useEffect(() => {
    console.log("invoicesData", invoicesData);
  }, [invoicesData]);

  const handleLineClick = (invoiceId: number) => {
    navigate(`/invoices/${invoiceId}`);
  };

  const filterInvoicesByStatus = (status: string) => {
    if (status === "all") {
      return invoicesData;
    }
    if (status === "drafts") {
      return invoicesData.filter((invoice: any) => invoice.is_draft === true);
    }
    if (status === "outstanding") {
      return invoicesData.filter(
        (invoice: any) => new Date(invoice.due_date) > new Date()
      );
    }
    if (status === "past_due") {
      return invoicesData.filter(
        (invoice: any) => new Date(invoice.due_date) < new Date()
      );
    }
    if (status === "paid") {
      return invoicesData.filter((invoice: any) => invoice.is_paid === true);
    }
  };

  return (
    <>
      <div>
        <button onClick={() => setCurrentTab("all")}>All</button>
        <button onClick={() => setCurrentTab("drafts")}>Drafts</button>
        <button onClick={() => setCurrentTab("outstanding")}>
          Outstanding
        </button>
        <button onClick={() => setCurrentTab("past_due")}>Past Due</button>
        <button onClick={() => setCurrentTab("paid")}>Paid</button>
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
          {filterInvoicesByStatus(currentTab).map((invoice: any) => (
            <tr key={invoice.id} onClick={() => handleLineClick(invoice.id)}>
              <td>#{invoice.id}</td>
              <td>CUSTOMER NAME</td>
              <td>{formatDate2(invoice.date)}</td>
              <td>{formatDate2(invoice.due_date)}</td>
              <td>{invoice.total}</td>
              <td>BALANCE</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default InvoiceTable;
