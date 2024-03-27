import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import fetcher from "../../utils/fetcher";
import Invoice from "../../components/invoice/Invoice";
import { invoiceDataFormatterReceive } from "../../utils/invoiceDataFormatter";

const EditInvoice = () => {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState<TInvoice>();
  const [author, setAuthor] = useState<TUserInfos>();
  const [client, setClient] = useState<TUserInfos>();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetcher(`invoices/${id}`, undefined, "GET", true);
        if (!response.error) {
          // console.log(response);
          const invoice = invoiceDataFormatterReceive(response);
          setInvoiceData(invoice);
          setAuthor(invoice.author);
          setClient(invoice.client);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error("Erreur lors de la sélection des données :", error);
      }
    };
    fetchInvoice();
  }, [id]);

  return (
    <>
      <h1>EditInvoice</h1>
      <Link to={`/invoices/${id}`}>Back to invoice #{id}</Link>
      {!invoiceData && <p>Loading...</p>}
      {/* {invoiceData && author && <Invoice invoiceProp={invoiceData} authorProp={author} />} */}
      {invoiceData && author && client && (
        <Invoice invoiceProp={invoiceData} authorProp={author} clientProp={client} />
      )}
    </>
  );
};

export default EditInvoice;
