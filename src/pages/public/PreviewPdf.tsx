import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { PdfGenerator } from "../../utils/PdfGenerator";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { errorAtom } from "../../atom/notificationAtom";

export default function PreviewPdf() {
  const location = useLocation();
  const state = location.state;

  const navigate = useNavigate();

  const setError = useSetAtom(errorAtom);

  if (!state && !state.invoice) {
    setError("Your document could not be generated");
    navigate("/");
  }

  const invoice = state.invoice;

  return (
    <>
      <PDFDownloadLink document={<PdfGenerator invoice={invoice} />} className="btn">
        Download my file
      </PDFDownloadLink>
      <PDFViewer
        style={{
          width: "100%",
          aspectRatio: "1/1.414",
          maxHeight: "100vh",
        }}>
        <PdfGenerator invoice={invoice} />
      </PDFViewer>
    </>
  );
}
