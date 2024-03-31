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

  const amountTotalInvoices = (client: TClient, daysAgo?: number) => {
    let totalAmount = 0;
    if (client.invoices) {
      client.invoices.forEach((invoice: TInvoiceGetBack) => {
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
    return totalAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const countInvoicesByDuration = (client: TClient, daysAgo?: number) => {
    let invoiceCount = 0;
    if (client.invoices) {
      if (!daysAgo || daysAgo === 0) {
        invoiceCount = client.invoices.length;
      } else {
        const daysAgoDate = new Date();
        daysAgoDate.setDate(daysAgoDate.getDate() - daysAgo);
        client.invoices.forEach((invoice: TInvoiceGetBack) => {
          const issued = new Date(invoice.issued_at);
          if (issued > daysAgoDate) {
            invoiceCount++;
          }
        });
      }
    }
    return invoiceCount;
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
            <tr
              key={client.id}
              onClick={() => client.id && handleClientClick(client.id)}
            >
              <td className="client-table__business-name">
                {client.business_name}
              </td>
              <td>
                <p>{amountTotalInvoices(client, 7)} €</p>
                <p>
                  {countInvoicesByDuration(client, 7)}{" "}
                  {countInvoicesByDuration(client, 7) > 1
                    ? "invoices"
                    : "invoice"}
                </p>
              </td>
              <td>
                <p>{amountTotalInvoices(client, 14)} €</p>
                <p>
                  {countInvoicesByDuration(client, 14)}{" "}
                  {countInvoicesByDuration(client, 14) > 1
                    ? "invoices"
                    : "invoice"}
                </p>
              </td>
              <td>
                <p>{amountTotalInvoices(client, 30)} €</p>
                <p>
                  {countInvoicesByDuration(client, 30)}{" "}
                  {countInvoicesByDuration(client, 30) > 1
                    ? "invoices"
                    : "invoice"}
                </p>
              </td>
              <td>
                <p>{amountTotalInvoices(client, 60)} €</p>
                <p>
                  {countInvoicesByDuration(client, 60)}{" "}
                  {countInvoicesByDuration(client, 60) > 1
                    ? "invoices"
                    : "invoice"}
                </p>
              </td>
              <td>
                <p>{amountTotalInvoices(client)} €</p>
                <p>
                  {countInvoicesByDuration(client)}{" "}
                  {countInvoicesByDuration(client) > 1 ? "invoices" : "invoice"}
                </p>
              </td>
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
