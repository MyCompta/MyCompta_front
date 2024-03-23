import React, { useEffect, useState } from "react";
import fetcher from "../../utils/fetcher";
import Cookies from "js-cookie"; // TO GET ID CURRENT SOCIETY AND BE ABLE TO SET A NEW ONE
import "./SocietyIndex.scss";
import Society from "./Society";

const SocietyIndex = () => {
  const [societiesData, setSocietiesData] = useState();
  const [currentSociety, setCurrentSociety] = useState(
    Cookies.get("currentSociety") ? Cookies.get("currentSociety") : 1
  );

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
            <Society
              key={society.id}
              society={society}
              currentSociety={currentSociety}
              setCurrentSociety={setCurrentSociety}
            />
          ))}
      </div>
    </>
  );
};

export default SocietyIndex;
