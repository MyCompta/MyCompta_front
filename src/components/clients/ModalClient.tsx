import React from "react";
import "./ModalClient.scss";
import ClientNew from "./ClientNew";
import ClientEdit from "./ClientEdit";
import { useAtom } from "jotai";
import { newClientModalStatusAtom } from "../../atom/modalAtom";
import { editClientModalStatusAtom } from "../../atom/modalAtom";

const ModalClient = ({ clientData, setClientData }) => {
  const [newClientModalStatus, setNewClientModalStatus] = useAtom(
    newClientModalStatusAtom
  );
  const [editClientModalStatus, setEditClientModalStatus] = useAtom(
    editClientModalStatusAtom
  );

  const handleCloseModal = () => {
    setNewClientModalStatus(false);
    setEditClientModalStatus(false);
  };

  return (
    <div className="dark-bg">
      <div className="modal-client">
        <div className="modal-client__close" onClick={handleCloseModal}>
          ×
        </div>
        {newClientModalStatus && <ClientNew />}
        {editClientModalStatus && (
          <ClientEdit clientData={clientData} setClientData={setClientData} />
        )}
      </div>
    </div>
  );
};

export default ModalClient;
