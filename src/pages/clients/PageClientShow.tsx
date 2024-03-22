import { useState, useEffect } from "react";
import fetcher from "../../utils/fetcher";
import { useParams, useNavigate } from "react-router-dom";
import { formatDate2 } from "../../utils/date";
import "./PageClientShow.scss";
import { useAtom } from "jotai";
import { editClientModalStatusAtom } from "../../atom/modalAtom";
import ModalClientNew from "../../components/clients/ModalClientNew";

const PageClientShow = () => {
  const { id } = useParams();
  const [clientData, setClientData] = useState([]);
  const navigate = useNavigate();
  const [editClientModalStatus, setEditClientModalStatus] = useAtom(
    editClientModalStatusAtom
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher(`clients/${id}`, undefined, "GET", true);
        if (!response.error) {
          setClientData(response);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error("Erreur lors de la sélection des données :", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    console.log("clientData", clientData);
  }, [clientData]);

  const handleInvoiceClick = (invoiceId) => {
    navigate(`/invoices/${invoiceId}`);
  };

  return (
    <>
      <div className="client-show-header">
        <h1>{clientData.business_name}</h1>
        <p className="client-show-header__business-id">
          Business id : {clientData.siret}
        </p>
      </div>
      <div className="client-show-body">
        <div className="client-show-body__row1">
          <div className="client-show-body__row1-header">
            <h2>Client details</h2>
            <p onClick={() => setEditClientModalStatus(true)}>Edit</p>
          </div>
          <h3>Owner:</h3>
          <p>
            {clientData.first_name} {clientData.last_name}
          </p>
          <h3>Address:</h3>
          <p>{clientData.address}</p>
          <p>
            {clientData.zip} {clientData.city}
          </p>
          <p>COUNTRY</p>
        </div>

        <div className="client-show-body__row2">
          <h2>Invoices</h2>
          <table className="client-table">
            <thead>
              <tr>
                <th>INVOICE</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>BALANCE</th>
              </tr>
            </thead>
            <tbody>
              {clientData.invoices &&
                clientData.invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    onClick={() => handleInvoiceClick(invoice.id)}
                  >
                    <td>#{invoice.id}</td>
                    <td>{formatDate2(invoice.date)}</td>
                    <td>{invoice.total}</td>
                    <td>BALANCE</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {editClientModalStatus && <ModalClientNew clientData={clientData} />}
    </>
  );
};

export default PageClientShow;
