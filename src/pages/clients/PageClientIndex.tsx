import { Link } from "react-router-dom";
import ClientIndex from "../../components/clients/ClientIndex";
import "./PageClientIndex.scss";

const PageClientIndex = () => {
  return (
    <>
      <div className="client-title-box">
        <h2>My clients</h2>
        <Link to="/clients/new" className="btnclientnew">
          New client
        </Link>
      </div>

      <ClientIndex />
    </>
  );
};

export default PageClientIndex;
