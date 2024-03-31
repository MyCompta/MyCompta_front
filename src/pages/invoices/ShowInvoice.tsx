import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fetcher from "../../utils/fetcher";
import { useSetAtom } from "jotai";
import { successAtom } from "../../atom/notificationAtom";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { PdfGenerator } from "../../utils/PdfGenerator";
import { invoiceDataFormatterReceive } from "../../utils/invoiceDataFormatter";
import Switch from "react-switch";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import "./ShowInvoice.scss";

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
      ...invoiceData!,
      is_draft: checked,
      ...(checked && { is_paid: false, status: "draft" }),
      ...(!checked && invoiceData?.status === "draft" && { status: "pending" }),
    });
  };

  const handlePaid = (checked: boolean) => {
    setInvoiceData({
      ...invoiceData!,
      is_paid: checked,
      ...(checked && { is_draft: false }),
      ...(checked && invoiceData?.status !== "paid" && { status: "paid" }),
      ...(invoiceData?.status === "paid" && !checked && { status: "sent" }),
    });
  };

  /*
  const handleStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setInvoiceData({
      ...invoiceData!,
      status: value as "paid" | "sent" | "draft" | "pending",
      ...(value === "paid" && { is_draft: false, is_paid: true }),
      ...(value !== "paid" &&
        invoiceData?.status === "paid" && { is_paid: false }),
      ...(value === "draft" && { is_draft: true, is_paid: false }),
      ...(value !== "draft" &&
        invoiceData?.status === "draft" && { is_draft: false }),
    });
  };
  */

  useEffect(() => {
    // Update invoiceData
    const updateInvoice = async () => {
      if (!invoiceData) return;
      const formData = new FormData();
      formData.append(
        "invoice[is_draft]",
        String(invoiceData.is_draft !== undefined ? invoiceData.is_draft : true)
      );
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
      <div className="invoice-show-header">
        <div className="invoice-show-header__title-line">
          <h1>Invoice #{invoiceData?.number}</h1>
          <p>{invoiceData?.status}</p>
        </div>
        <div className="invoice-show-header__baseline">
          <Link to="/invoices" className="invoice-show-header__baseline-back">
            <IoIosArrowDropleftCircle /> Invoices list
          </Link>
          {invoiceData && (
            <>
              <div className="invoice-show-header__baseline-draft">
                <p>Draft</p>
                <Switch checked={invoiceData.is_draft!} onChange={handleDraft} />
              </div>
              <div className="invoice-show-header__baseline-paid">
                <p>Paid</p>
                <Switch checked={invoiceData.is_paid!} onChange={handlePaid} />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="invoice-show-body">
        <div className="invoice-show-body__right-box">
          <Link to={`/invoices/${id}/edit`}>Edit</Link>
          <button
            onClick={() => {
              window.confirm("Are you sure to delete this invoice?") && onClick();
            }}>
            Delete
          </button>
        </div>
      </div>

      {invoiceData && (
        <>
          {/*}
          <div>
            Invoice status :
            <select value={invoiceData.status} onChange={handleStatusSelect}>
              <option value={"draft"}>Draft</option>
              <option value={"pending"}>Pending</option>
              <option value={"sent"}>Sent</option>
              <option value={"paid"}>Paid</option>
            </select>
          </div>
      */}
          <PDFDownloadLink document={<PdfGenerator invoice={invoiceData} />} className="btn">
            Download my file
          </PDFDownloadLink>
          <div>
            <PDFViewer
              style={{
                width: "100%",
                aspectRatio: "1/1.414",
                maxHeight: "100vh",
              }}>
              <PdfGenerator invoice={invoiceData} />
            </PDFViewer>
          </div>
        </>
      )}
    </>
  );
};

export default ShowInvoice;
