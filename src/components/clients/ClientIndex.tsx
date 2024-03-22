import { useState, useEffect } from "react";
import fetcher from "../../utils/fetcher";
import { useNavigate } from "react-router-dom";
import "./ClientIndex.scss";

const ClientIndex = () => {
  const [clientsData, setClientsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher("/clients", undefined, "GET", true);
        if (!response.error) {
          setClientsData(response);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  const handleClientClick = (clientId: number) => {
    navigate(`/clients/${clientId}`);
  };

  return (
    <table className="client-table">
      <thead>
        <tr>
          <th>CUSTOMER</th>
          <th>0 - 7 DAYS</th>
          <th>0 - 14 DAYS</th>
          <th>0 - 30 DAYS</th>
          <th>0 - 60 DAYS</th>
          <th>TOTAL</th>
        </tr>
      </thead>
      <tbody>
        {clientsData.map((client) => (
          <tr key={client.id}>
            <td
              onClick={() => handleClientClick(client.id)}
              className="client-table__business-name"
            >
              {client.business_name}
            </td>
            <td>_</td>
            <td>_</td>
            <td>_</td>
            <td>_</td>
            <td>_</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientIndex;