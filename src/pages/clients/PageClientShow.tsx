import { useState, useEffect } from "react";
import fetcher from "../../utils/fetcher";
import { useParams, useNavigate, Link } from "react-router-dom";
import { formatDate2 } from "../../utils/date";
import "./PageClientShow.scss";
import { useAtom } from "jotai";
import { editClientModalStatusAtom } from "../../atom/modalAtom";
import ModalClient from "../../components/clients/ModalClient";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useSetAtom } from "jotai";
import { errorAtom } from "../../atom/notificationAtom";

const PageClientShow = () => {
  const { id } = useParams();
  const [clientData, setClientData] = useState<TClientBack>();
  const [invoiceClientData, setInvoiceClientData] =
    useState<TInvoiceGetBack[]>();
  const navigate = useNavigate();
  const [editClientModalStatus, setEditClientModalStatus] = useAtom(
    editClientModalStatusAtom
  );
  const setError = useSetAtom(errorAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher(`clients/${id}`, undefined, "GET", true);
        if (!response.error) {
          setClientData(response);
          setInvoiceClientData(response.invoices);
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

  useEffect(() => {
    console.log("invoiceClientData", invoiceClientData);
  }, [invoiceClientData]);

  const handleInvoiceClick = (invoiceId: number) => {
    navigate(`/invoices/${invoiceId}`);
  };

  const handleDeleteClient = async () => {
    // NOT WORKING NOW : PROBABLY NEED A DEPEND DESTROY ON INVOICE
    const confirmed = window.confirm(
      "Are you sure you want to delete this client? All associated information with this client will be erased."
    );
    if (!confirmed) return;

    try {
      const response = await fetcher(
        `clients/${id}`,
        undefined,
        "DELETE",
        true
      );
      if (!response.error) {
        console.log("Client deleted successfully");
        setError("Client deleted successfully");
        navigate("/clients");
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Error during delete property:", error);
    }
  };

  return (
    <>
      {clientData && (
        <>
          <div className="client-show-header">
            <h1>{clientData.business_name}</h1>
            <div className="client-show-header__baseline">
              <Link to="/clients" className="client-show-header__baseline-back">
                <IoIosArrowDropleftCircle />
                Clients
              </Link>
              <p className="client-show-header__baseline-business-id">
                -&nbsp; Business id : {clientData.siret}
              </p>
            </div>
          </div>
          <div className="client-show-body">
            <div className="client-show-body__row1">
              <div className="client-show-body__row1-header">
                <h2>Client details</h2>
                <div className="client-show-body__row1-header-right-box">
                  <p
                    onClick={() => setEditClientModalStatus(true)}
                    className="edit"
                  >
                    Edit
                  </p>
                  <p onClick={handleDeleteClient} className="delete">
                    Delete
                  </p>
                </div>
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
                  {invoiceClientData ? (
                    invoiceClientData.map((invoice) => (
                      <tr
                        key={invoice.id}
                        onClick={() => handleInvoiceClick(invoice.id)}
                      >
                        <td>#{invoice.id}</td>
                        <td>{formatDate2(invoice.date)}</td>
                        <td>{invoice.total}</td>
                        <td>BALANCE</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>Loading invoices...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {editClientModalStatus && (
        <ModalClient clientData={clientData} setClientData={setClientData} />
      )}
    </>
  );
};

export default PageClientShow;
