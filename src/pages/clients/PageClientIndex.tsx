import { Link } from "react-router-dom";
import ClientIndex from "../../components/clients/ClientIndex";
import "./PageClientIndex.scss";

const PageClientIndex = () => {
  return (
    <>
      <div className="client-title-box">
        <h1>My clients</h1>
        <Link to="/clients/new" className="btn">
          New client
        </Link>
      </div>

      <ClientIndex />
    </>
  );
};

export default PageClientIndex;
