import { useAtom } from "jotai";
import { societyModalStatusAtom } from "../../atom/modalAtom";
import SocietyIndex from "./SocietyIndex";

const ModalSociety = () => {
  const [societyModalStatus, setSocietyModalStatus] = useAtom(
    societyModalStatusAtom
  );

  const handleCloseModal = () => {
    setSocietyModalStatus(false);
  };

  return (
    <div className="dark-bg">
      <div className="modal">
        <div className="modal__close" onClick={handleCloseModal}>
          ×
        </div>
        <SocietyIndex setSocietyModalStatus={setSocietyModalStatus} />
      </div>
    </div>
  );
};

export default ModalSociety;
