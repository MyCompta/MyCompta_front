import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fetcher from "../../utils/fetcher";
import Cookies from "js-cookie";

const ShowInvoice = () => {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher(`invoices/${id}`, undefined, "GET");
        if (!response.error) {
          setInvoiceData(response);
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
    console.log("invoiceData", invoiceData);
  }, [invoiceData]);

  const onClick = async () => {
    try {
      const response = await fetcher(`invoices/${id}`, undefined, "DELETE");

      if (!response.error) {
        navigate(`/invoices`);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Error during delete property:", error.message);
    }
  };

  return (
    <>
      <h1>Invoice #{id}</h1>
      <Link to="/invoices">Back to invoices list</Link>
      <Link to={`/invoices/${id}/edit`}>Edit</Link>
      <button onClick={onClick}>Delete</button>
    </>
  );
};

export default ShowInvoice;
