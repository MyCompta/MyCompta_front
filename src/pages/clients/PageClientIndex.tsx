import ClientIndex from "../../components/clients/ClientIndex";
import "./PageClientIndex.scss";
import { useAtom } from "jotai";
import { newClientModalStatusAtom } from "../../atom/modalAtom";

const PageClientIndex = () => {
  const [newClientModalStatus, setNewClientModalStatus] = useAtom(
    newClientModalStatusAtom
  );

  const handleOpenModalNewClient = () => {
    setNewClientModalStatus(true);
  };

  return (
    <>
      <div className="client-title-box">
        <h1>My clients</h1>
        <button className="btn" onClick={() => handleOpenModalNewClient()}>
          New client
        </button>
      </div>

      <ClientIndex />
    </>
  );
};

export default PageClientIndex;
