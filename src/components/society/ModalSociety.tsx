import SocietyIndex from "./SocietyIndex";
import { useSetAtom } from "jotai";
import { societyModalStatusAtom } from "../../atom/modalAtom";

const ModalSociety = () => {
  const setSocietyModalStatus = useSetAtom(societyModalStatusAtom);
  const handleCloseModal = () => {
    setSocietyModalStatus(false);
  };

  return (
    <div className="dark-bg">
      <div className="modal">
        <div className="modal__close" onClick={handleCloseModal}>
          ×
        </div>
        <SocietyIndex />
      </div>
    </div>
  );
};

export default ModalSociety;
