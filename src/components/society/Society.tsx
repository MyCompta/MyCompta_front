import React from "react";
import Cookies from "js-cookie";

const society = ({
  society,
  currentSociety,
  setCurrentSociety,
  setSocietyModalStatus,
}) => {
  const handleUpdateCurrentSociety = () => {
    Cookies.set("currentSociety", society.id);
    setCurrentSociety(society);
    setSocietyModalStatus(false);
  };

  return (
    <div
      className="modal-society-body__item"
      onClick={handleUpdateCurrentSociety}
    >
      {society.name}
      {parseInt(currentSociety.id) === society.id ? (
        <div className="modal-society-body__item--active"></div>
      ) : null}
    </div>
  );
};

export default society;
