import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";

const Society = ({
  society,
  currentSociety,
  setCurrentSociety,
  setSocietyModalStatus,
}: {
  society: TSocietyBack;
  currentSociety: number;
  setCurrentSociety: Dispatch<SetStateAction<number | null>>;
  setSocietyModalStatus: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleUpdateCurrentSociety = () => {
    Cookies.set("currentSociety", String(society.id));
    setCurrentSociety(society);
    setSocietyModalStatus(false);
  };

  return (
    <div
      className="modal-society-body__item"
      onClick={handleUpdateCurrentSociety}
    >
      {society.name}
      {parseInt(currentSociety) === society.id ? (
        <div className="modal-society-body__item--active"></div>
      ) : null}
    </div>
  );
};

export default Society;
