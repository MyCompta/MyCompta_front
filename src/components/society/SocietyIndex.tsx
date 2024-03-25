import { useEffect, useState } from "react";
import fetcher from "../../utils/fetcher";
import Cookies from "js-cookie"; // TO GET ID CURRENT SOCIETY AND BE ABLE TO SET A NEW ONE
import "./SocietyIndex.scss";
import Society from "./Society";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { societyModalStatusAtom } from "../../atom/modalAtom";

import { IoDocumentText } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useAtom } from "jotai";
import { currentSocietyAtom } from "../../atom/societyAtom";

const SocietyIndex = () => {
  const setSocietyModalStatus = useSetAtom(societyModalStatusAtom);
  const [societiesData, setSocietiesData] = useState();
  const [currentSociety, setCurrentSociety] = useAtom(currentSocietyAtom);
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

  const handleDeleteSociety = async (societyId) => {
    const response = await fetcher(`societies/${societyId}`, undefined, "DELETE", true);
    if (!response.error) {
      setSocietiesData(societiesData.filter((society) => society.id !== societyId));
    } else {
      console.error(response.error);
    }
  };

  return (
    <>
      <div className="modal-society-header">
        <h1>Switch society</h1>
        <button className="modal-society-header__btn btn" onClick={handleNewSociety}>
          +
        </button>
      </div>
      <div className="modal-society-body">
        {societiesData &&
          societiesData.map((society) => (
            <div className="modal-society-item-container" key={society.id}>
              <Society
                society={society}
                currentSociety={currentSociety}
                setCurrentSociety={setCurrentSociety}
                setSocietyModalStatus={setSocietyModalStatus}
              />
              <div className="modal-society-item-options">
                <IoDocumentText
                  className="btn btn--no-bg btn--xs"
                  title="Details"
                  onClick={() => navigate(`/societies/${society.name}`)}
                />
                <MdEditDocument
                  className="btn btn--no-bg btn--xs"
                  title="Edit"
                  onClick={() => navigate(`/societies/${society.name}/edit`)}
                />
                <FaTrash
                  className="modal-society-item-options__trash btn btn--alert btn--xs"
                  title="Delete"
                  onClick={() => handleDeleteSociety(society.id)}
                />
              </div>
            </div>
          ))}
        {societiesData && societiesData.length === 0 && (
          <div className="modal-society-body__item">No society yet</div>
        )}
      </div>
    </>
  );
};

export default SocietyIndex;
