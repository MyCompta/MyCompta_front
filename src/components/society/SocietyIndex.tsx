import { useEffect, useState } from "react";
import fetcher from "../../utils/fetcher";
import Cookies from "js-cookie"; // TO GET ID CURRENT SOCIETY AND BE ABLE TO SET A NEW ONE
import "./SocietyIndex.scss";
import Society from "./Society";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { societyModalStatusAtom } from "../../atom/modalAtom";
import { errorAtom } from "../../atom/notificationAtom";

import { IoDocumentText } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const SocietyIndex = () => {
  const setSocietyModalStatus = useSetAtom(societyModalStatusAtom);
  const [societiesData, setSocietiesData] = useState<TSocietyBack[]>();
  const navigate = useNavigate();
  const setError = useSetAtom(errorAtom);

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

  const handleShowSociety = (societyId: number) => {
    setSocietyModalStatus(false);
    navigate(`/societies/${societyId}`);
  };

  const handleEditSociety = (societyId: number) => {
    setSocietyModalStatus(false);
    navigate(`/societies/${societyId}/edit`);
  };

  const handleDeleteSociety = async (societyId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this society? All associated information with this society will be erased."
    );
    if (!confirmed) return;

    const response = await fetcher(`societies/${societyId}`, undefined, "DELETE", true);
    if (!response.error) {
      const newSocietiesData = societiesData?.filter((society) => society.id !== societyId);
      setSocietiesData(newSocietiesData);
      if (societyId === parseInt(Cookies.get("currentSociety")!) && newSocietiesData?.length) {
        Cookies.set("currentSociety", String(newSocietiesData[0].id));
      }
      if (!newSocietiesData?.length) {
        Cookies.remove("currentSociety");
      }
      console.log("Society deleted successfully");
      setError("Society deleted successfully");
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
              <Society society={society} setSocietyModalStatus={setSocietyModalStatus} />
              <div className="modal-society-item-options">
                <IoDocumentText
                  className="btn btn--no-bg btn--xs"
                  title="Details"
                  onClick={() => handleShowSociety(society.id)}
                />
                <MdEditDocument
                  className="btn btn--no-bg btn--xs"
                  title="Edit"
                  onClick={() => handleEditSociety(society.id)}
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
