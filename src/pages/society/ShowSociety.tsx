import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAtomValue, useSetAtom } from "jotai";

// import fetcher from "../../utils/fetcher";

import EditComponentSociety from "../../components/society/EditComponentSociety";
import EditSociety from "./EditSociety";
import societyAtom from "../../atom/societyAtom";
import IndexInvoices from "../invoices/IndexInvoices";
import PageClientIndex from "../clients/PageClientIndex";
import "./society.scss";

const apiUrl = import.meta.env.VITE_API_URL;

const ShowSociety = () => {
  const [showEditSociety, setShowEditSociety] = useState(false);
  const [societyData, setSocietyData] = useState<TSocietyBack>();
  const setSocietyAtom = useSetAtom(societyAtom);


  const idsociety = useAtomValue(societyAtom);
  const id = idsociety!.id;


  Cookies.set("currentSociety", String(id));
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + `societies/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(Cookies.get("token")!).token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setSocietyData(data);
          setSocietyAtom(data);
        } else {
          const error = await response.json();
          console.error(error);
        }
      } catch (error) {
        console.error("Erreur lors de la sélection des données :", error);
      }
    };

    fetchData();
  }, [id, showEditSociety, setSocietyAtom]);

  const handleEditSocietyClick = () => {
    setShowEditSociety(true);
  };

  const closeEditModal = () => {
    setShowEditSociety(false);
  };

  return (
    <>
      <div className="headershowsociety">
        <h1>
          {societyData && societyData.name && societyData.name.toUpperCase()}{" "}
          <span style={{ fontSize: "0.6em" }}>{societyData?.status}</span>
        </h1>
        <EditComponentSociety onClick={handleEditSocietyClick} />
      </div>

      <div className="displayshowsociety">
        {societyData && (
          <div className="leftinfosociety">
            <h4>Siret n°: </h4>
            {societyData.siret}
            <br />
            <h4>Capital: </h4>
            {societyData.capital}
            <br />
            <h4>Address: </h4>
            {societyData.address}
            <br />
            <h4>Zip code: </h4>
            {societyData.zip}
            <br />
            <h4>City: </h4>
            {societyData.city}
            <br />
            <h4>Country: </h4>
            {societyData.country}
            <br />
            <h4>email: </h4>
            {societyData.email}
            <br />
          </div>
        )}
        <div className="rightinfosociety">
          <div className="indexinvoicesshowsociety">
            <IndexInvoices />
          </div>
          <div className="indexclientsshowsociety">
            <PageClientIndex />
          </div>
        </div>
        {showEditSociety && (
          <div className="display_edit_and_new_societycontainer">
            <EditSociety closeEditModal={closeEditModal} />
            <button onClick={closeEditModal} className="closetag">
              X
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowSociety;
