import ClientIndex from "../../components/clients/ClientIndex";
import "./PageClientIndex.scss";
import { useSetAtom } from "jotai";
import { newClientModalStatusAtom } from "../../atom/modalAtom";

const PageClientIndex = () => {
  const setNewClientModalStatus = useSetAtom(newClientModalStatusAtom);

  const handleOpenModalNewClient = () => {
    setNewClientModalStatus(true);
  };

  return (
    <>
      <div className="client-title-box">
        <h1>My clients</h1>
        <button
          className="btn client-title-box__btn"
          onClick={() => handleOpenModalNewClient()}
        >
          New client
        </button>
      </div>

      <ClientIndex />
    </>
  );
};

export default PageClientIndex;
