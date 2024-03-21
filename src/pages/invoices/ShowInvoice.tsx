import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fetcher from "../../utils/fetcher";
import { useSetAtom } from "jotai";
import { successAtom } from "../../atom/notificationAtom";
import { PDFViewer } from "@react-pdf/renderer";
import { PdfGenerator } from "../../utils/PdfGenerator";
import { invoiceDataFormatterReceive } from "../../utils/invoiceDataFormatter";
import Switch from "react-switch";

const ShowInvoice = () => {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState<TInvoice>();
  const navigate = useNavigate();
  const setSuccess = useSetAtom(successAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher(`invoices/${id}`, undefined, "GET", true);
        if (!response.error) {
          setInvoiceData(invoiceDataFormatterReceive(response));
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
      const response = await fetcher(`invoices/${id}`, undefined, "DELETE", true);

      // TODO: add error handling

      if (!response.error) {
        console.log(response);
        setSuccess("Facture supprimée avec succès");
        navigate(`/invoices`);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Error during delete property:", error);
    }
  };

  const handleDraft = (checked: boolean) => {
    setInvoiceData({
      ...invoiceData,
      is_draft: checked,
      ...(checked && { is_paid: false }),
      ...(checked && { status: "draft" }),
    });
  };

  const handlePaid = (checked: boolean) => {
    setInvoiceData({
      ...invoiceData,
      is_paid: checked,
      ...(checked && { is_draft: false }),
      ...(invoiceData?.status === "paid" && !checked && { status: "sent" }),
    });
  };

  const handleStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setInvoiceData({
      ...invoiceData,
      status: value,
      ...(value === "paid" && { is_draft: false, is_paid: true }),
      ...(value !== "paid" && invoiceData?.status === "paid" && { is_paid: false }),
      ...(value === "draft" && { is_draft: true, is_paid: false }),
    });
  };

  useEffect(() => {
    // Update invoiceData
    const updateInvoice = async () => {
      if (!invoiceData) return;
      const formData = new FormData();
      formData.append("invoice[is_draft]", String(invoiceData.is_draft || true));
      formData.append("invoice[is_paid]", String(invoiceData.is_paid || false));
      formData.append("invoice[status]", invoiceData.status || "draft");

      const res = await fetcher(`invoices/${id}`, formData, "PATCH", true);

      if (!res.error) {
        console.log(res);
      } else {
        console.error(res.error);
      }
    };
    updateInvoice();
  }, [invoiceData, id]);

  return (
    <>
      <h1>Invoice {invoiceData?.number}</h1>
      {invoiceData && (
        <>
          <div>
            Invoice status :
            <select value={invoiceData?.status} onChange={handleStatusSelect}>
              <option value={"draft"}>Draft</option>
              <option value={"pending"}>Pending</option>
              <option value={"sent"}>Sent</option>
              <option value={"paid"}>Paid</option>
            </select>
          </div>
          <div>
            Draft : <Switch checked={invoiceData.is_draft!} onChange={handleDraft} />
          </div>
          <div>
            Paid : <Switch checked={invoiceData.is_paid!} onChange={handlePaid} />
          </div>
          <div>
            <PDFViewer style={{ width: "100%", aspectRatio: "1/1.414", maxHeight: "100vh" }}>
              <PdfGenerator invoice={invoiceData} />
            </PDFViewer>
          </div>
        </>
      )}
      <Link to="/invoices">Back to invoices list</Link>
      <Link to={`/invoices/${id}/edit`}>Edit</Link>
      <button onClick={onClick}>Delete</button>
    </>
  );
};

export default ShowInvoice;
