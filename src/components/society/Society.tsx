import { useEffect, Dispatch, SetStateAction } from "react";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { currentSocietyAtom } from "../../atom/societyAtom";

const Society = ({
  society,
  setSocietyModalStatus,
}: {
  society: TSocietyBack;
  setSocietyModalStatus: Dispatch<SetStateAction<boolean>>;
}) => {
  const [currentSociety, setCurrentSociety] = useAtom(currentSocietyAtom);

  const handleUpdateCurrentSociety = () => {
    Cookies.set("currentSociety", String(society.id));
    setCurrentSociety(society.id);
    setSocietyModalStatus(false);
  };

  useEffect(() => {
    console.log("currentSociety", currentSociety);
  });

  return (
    <div
      className="modal-society-body__item"
      onClick={handleUpdateCurrentSociety}
    >
      {society.name}
      {currentSociety === society.id ? (
        <div className="modal-society-body__item--active"></div>
      ) : null}
    </div>
  );
};

export default Society;
