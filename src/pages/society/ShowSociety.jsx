import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useAtom } from "jotai";

import fetcher from "../../utils/fetcher";

import EditComponentSociety from "../../components/society/EditComponentSociety";
import EditSociety from "./EditSociety";
import societyAtom from "../../atom/societyAtom";

import IndexInvoices from "../invoices/IndexInvoices";

import PageClientIndex from "../clients/PageClientIndex";

import "./society.scss";

const apiUrl = import.meta.env.VITE_API_URL;
const token = Cookies.get("token");

const ShowSociety = () => {
  const [showEditSociety, setShowEditSociety] = useState(false);
  const [societyData, setSocietyData] = useState([]);
  const [, setAtomData] = useAtom(societyAtom);
  const navigate = useNavigate();

  const id = localStorage.getItem("selectedSocietyId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + `societies/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(Cookies.get("token")).token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setSocietyData(data);
          setAtomData(data);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error("Erreur lors de la sélection des données :", error);
      }
    };

    fetchData();
  }, [societyAtom]);

  const handleEditSocietyClick = () => {
    setShowEditSociety(true);
  };
  return (
    <>
      <div className="headershowsociety">
        <h1>
          {societyData.name && societyData.name.toUpperCase()}{" "}
          <span style={{ fontSize: "0.6em" }}>{societyData.status}</span>
        </h1>
        <EditComponentSociety onClick={handleEditSocietyClick} />
      </div>

      <div className="displayshowsociety">
        <div className="leftinfosociety">
          <h4>Siret n°: </h4>
          {societyData.siret}
          <br />
          <h4>Capital: </h4>
          {societyData.capital}
          <br />
          <h4>Address: </h4>
          {societyData.adress}
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
        <div className="rightinfosociety">
          <div className="indexinvoicesshowsociety">
            <IndexInvoices />
          </div>
          <div className="indexclientsshowsociety">
            <PageClientIndex />
          </div>
        </div>
        <div className="displaycreatesocietycontainer">
          {showEditSociety && (
            <div>
              <EditSociety />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowSociety;
