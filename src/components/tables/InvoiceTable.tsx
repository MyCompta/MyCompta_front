import { useState, useEffect } from "react";
import "./InvoiceTable.scss";
import fetcher from "../../utils/fetcher";
import { Link, useNavigate } from "react-router-dom";

const InvoiceTable = () => {
  const [invoicesData, setInvoicesData] = useState([]);
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

  const handleRowClick = (invoiceId: number) => {
    navigate(`/invoices/${invoiceId}`);
  };

  return (
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
        {invoicesData.map((invoice: any) => (
          <tr key={invoice.id} onClick={() => handleRowClick(invoice.id)}>
            <td>#{invoice.id}</td>
            <td>CUSTOMER NAME</td>
            <td>{invoice.date}</td>
            <td>{invoice.due_date}</td>
            <td>{invoice.total}</td>
            <td>BALANCE</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
