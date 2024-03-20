import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import fetcher from "../../utils/fetcher";
import Invoice from "../../components/invoice/Invoice";

const EditInvoice = () => {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState<TInvoice>();
  const [author, setAuthor] = useState<TUserInfos>();
  const [client, setClient] = useState<TUserInfos>();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetcher(`invoices/${id}`, undefined, "GET");
        if (!response.error) {
          // TODO : proper set data according to the request response
          setInvoiceData(response.invoice);
          setAuthor(response.author);
          setClient(response.client);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error("Erreur lors de la sélection des données :", error);
      }
    };
    fetchInvoice();
  });

  return (
    <>
      <h1>EditInvoice</h1>
      <Link to={`/invoices/${id}`}>Back to invoice #{id}</Link>
      {!invoiceData && <p>Loading...</p>}
      {invoiceData && author && client && (
        <Invoice invoiceProp={invoiceData} authorProp={author} clientProp={client} />
      )}
    </>
  );
};

export default EditInvoice;
