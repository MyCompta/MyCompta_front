import { useEffect } from "react";
import fetcher from "../../utils/fetcher";
import { useNavigate } from "react-router-dom";
import "./ClientIndex.scss";
import { useAtom } from "jotai";
import { currentSocietyAtom } from "../../atom/societyAtom";
import { clientAtom } from "../../atom/clientAtom";

const ClientIndex = () => {
  const [clientsData, setClientsData] = useAtom(clientAtom);
  const navigate = useNavigate();
  const [currentSociety] = useAtom(currentSocietyAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!currentSociety) return;
        const response = await fetcher(
          "/clients?society_id=" + currentSociety,
          undefined,
          "GET",
          true
        );
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
  }, [currentSociety, setClientsData]);

  useEffect(() => {
    console.log("clientsData : ", clientsData);
  }, [clientsData]);

  const handleClientClick = (clientId: number) => {
    navigate(`/clients/${clientId}`);
  };

  const AmountTotalInvoices = (client: TClient, daysAgo?: number) => {
    let totalAmount = 0;
    if (client.invoices) {
      client.invoices.forEach((invoice: TInvoice) => {
        if (!daysAgo || daysAgo === 0) {
          totalAmount += invoice.total;
        } else {
          const issued = new Date(invoice.issued_at);
          const daysAgoDate = new Date();
          daysAgoDate.setDate(daysAgoDate.getDate() - daysAgo);
          if (issued > daysAgoDate) {
            totalAmount += invoice.total;
          }
        }
      });
    }
    return totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 });
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
        {clientsData.length > 0 ? (
          clientsData.map((client: TClient) => (
            <tr key={client.id}>
              <td
                onClick={() => client.id && handleClientClick(client.id)}
                className="client-table__business-name"
              >
                {client.business_name}
              </td>
              <td>{AmountTotalInvoices(client, 7)}</td>
              <td>{AmountTotalInvoices(client, 14)}</td>
              <td>{AmountTotalInvoices(client, 30)}</td>
              <td>{AmountTotalInvoices(client, 60)}</td>
              <td>{AmountTotalInvoices(client)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="client-table__empty">
              No clients found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ClientIndex;
