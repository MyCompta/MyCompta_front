import React from "react";
import "./ModalClientNew.scss";
import ClientNew from "./ClientNew";
import { useAtom } from "jotai";
import { newClientModalStatusAtom } from "../../atom/modalAtom";

const ModalClientNew = ({ setShowModalNewClient }) => {
  const [newClientModalStatus, setNewClientModalStatus] = useAtom(
    newClientModalStatusAtom
  );

  const handleCloseModal = () => {
    setShowModalNewClient(false);
    setNewClientModalStatus(false);
  };

  return (
    <div className="dark-bg">
      <div className="modal-client-new">
        <div className="modal-client-new__header">
          <h1>New client</h1>
          <div
            className="modal-client-new__header-close"
            onClick={handleCloseModal}
          >
            ×
          </div>
        </div>
        <ClientNew setShowModalNewClient={setShowModalNewClient} />
      </div>
    </div>
  );
};

export default ModalClientNew;
