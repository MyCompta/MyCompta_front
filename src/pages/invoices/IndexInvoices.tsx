import { useState, useEffect } from "react";
import InvoiceTable from "../../components/invoice/InvoiceTable";
import { useAtomValue } from "jotai";
import { currentSocietyAtom } from "../../atom/societyAtom";
import fetcher from "../../utils/fetcher";

const IndexInvoices = () => {
  const [invoicesData, setInvoicesData] = useState<TInvoiceGetBack[]>([]);
  const currentSociety = useAtomValue(currentSocietyAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher(
          "/invoices?society_id=" + currentSociety,
          undefined,
          "GET",
          true
        );
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
  }, [currentSociety]);

  return (
    <>
      <InvoiceTable invoicesData={invoicesData} />
    </>
  );
};

export default IndexInvoices;
