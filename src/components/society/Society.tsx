import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { currentSocietyAtom } from "../../atom/societyAtom";

const society = ({ society, setSocietyModalStatus }) => {
  const [currentSociety, setCurrentSociety] = useAtom(currentSocietyAtom);

  const handleUpdateCurrentSociety = () => {
    Cookies.set("currentSociety", society.id);
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
      {parseInt(currentSociety) === society.id ? (
        <div className="modal-society-body__item--active"></div>
      ) : null}
    </div>
  );
};

export default society;
