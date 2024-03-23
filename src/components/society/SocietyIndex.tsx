import React, { useEffect, useState } from "react";
import fetcher from "../../utils/fetcher";
import Cookies from "js-cookie"; // TO GET ID CURRENT SOCIETY AND BE ABLE TO SET A NEW ONE
import "./SocietyIndex.scss";

const SocietyIndex = () => {
  const [societiesData, setSocietiesData] = useState();
  const id = 1; // TO REMOVE WHEN SOCIETY COOKIE SETS AND SET THE REAL CURRENT SOCIETY

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
  }, [id]);

  useEffect(() => {
    if (societiesData && societiesData.length > 0) {
      console.log("societiesData", societiesData);
      console.log("cookie", Cookies.get("currentSociety"));
      console.log("societiesData[0].id", societiesData[0].id);
    }
  }, [societiesData]);

  return (
    <>
      <div className="modal-society-header">
        <h1>Switch society</h1>
      </div>
      <div className="modal-society-body">
        {societiesData &&
          societiesData.map((society) => (
            <div
              key={society.id}
              className="modal-society-body__item"
              onClick={() => Cookies.set("currentSociety", society.id)}
            >
              {society.name}
              {parseInt(Cookies.get("currentSociety")) === society.id ? (
                <div className="modal-society-body__item--active"></div>
              ) : null}
            </div>
          ))}
      </div>
    </>
  );
};

export default SocietyIndex;
