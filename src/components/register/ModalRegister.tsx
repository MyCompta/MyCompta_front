import "./ModalRegister.scss";
import RegisterNew from "./RegisterNew";
import RegisterEdit from "./RegisterEdit";
import { useAtom } from "jotai";
import { newRegisterModalStatusAtom } from "../../atom/modalAtom";
import { editRegisterModalStatusAtom } from "../../atom/modalAtom";

const ModalRegister = () => {
  const [newRegisterModalStatus, setNewRegisterModalStatus] = useAtom(
    newRegisterModalStatusAtom
  );
  const [editRegisterModalStatus, setEditRegisterModalStatus] = useAtom(
    editRegisterModalStatusAtom
  );

  const handleCloseModal = () => {
    setNewRegisterModalStatus(false);
    setEditRegisterModalStatus(false);
  };

  return (
    <div className="dark-bg">
      <div className="modal">
        <div className="modal__close" onClick={handleCloseModal}>
          ×
        </div>
        {newRegisterModalStatus && <RegisterNew />}
        {editRegisterModalStatus && <RegisterEdit />}
      </div>
    </div>
  );
};

export default ModalRegister;
