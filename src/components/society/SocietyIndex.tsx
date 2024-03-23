import React, { useEffect, useState } from "react";
import fetcher from "../../utils/fetcher";
import Cookies from "js-cookie"; // TO GET ID CURRENT SOCIETY AND BE ABLE TO SET A NEW ONE
import "./SocietyIndex.scss";
import Society from "./Society";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import societyAtom from "../../atom/societyAtom.jsx";

const SocietyIndex = ({ setSocietyModalStatus }) => {
  const [societiesData, setSocietiesData] = useState();
  const [currentSociety, setCurrentSociety] = useState(
    Cookies.get("currentSociety")
      ? JSON.parse(Cookies.get("currentSociety"))
      : null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher(`societies`, undefined, "GET", true);
        if (!response.error) {
          setSocietiesData(response);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error("Erreur lors de la sélection des données :", error);
      }
    };

    fetchData();
  }, []);

  const handleNewSociety = () => {
    setSocietyModalStatus(false);
    navigate("/societies/create");
  };

  return (
    <>
      <div className="modal-society-header">
        <h1>Switch society</h1>
        <button
          className="modal-society-header__btn btn"
          onClick={handleNewSociety}
        >
          +
        </button>
      </div>
      <div className="modal-society-body">
        {societiesData &&
          societiesData.map((society) => (
            <Society
              key={society.id}
              society={society}
              currentSociety={currentSociety}
              setCurrentSociety={setCurrentSociety}
              setSocietyModalStatus={setSocietyModalStatus}
            />
          ))}
        {societiesData && societiesData.length === 0 && (
          <div className="modal-society-body__item">No society yet</div>
        )}
      </div>
    </>
  );
};

export default SocietyIndex;