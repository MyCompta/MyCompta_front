import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useSetAtom } from "jotai";

import EditComponentSociety from "../../components/society/EditComponentSociety";
import EditSociety from "./EditSociety";
import societyAtom from "../../atom/societyAtom";
import IndexInvoices from "../invoices/IndexInvoices";
import PageClientIndex from "../clients/PageClientIndex";

import DoughnutsCharts from '../../components/charts/DoughnutsCharts'
import { PolarCharts } from '../../components/charts/PolarCharts'
import { RadarCharts } from '../../components/charts/RadarCharts'
import PieCharts from '../../components/charts/PieCharts'
import LineCharts from '../../components/charts/LineCharts'
import BarCharts from '../../components/charts/BarCharts'
import { StackedCharts } from '../../components/charts/StackedCharts'

import "./society.scss";

const apiUrl = import.meta.env.VITE_API_URL;

const ShowSociety = () => {
  const [showEditSociety, setShowEditSociety] = useState(false);
  const [societyData, setSocietyData] = useState<TSocietyBack>();
  const setSocietyAtom = useSetAtom(societyAtom);
  const [selectedOption, setSelectedOption] = useState("turnover");
  const { id } = useParams();
  const [selectedOptionLarge, setSelectedOptionLarge] =
    useState("globalturnover");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSelectChangeLarge = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOptionLarge(event.target.value);
  };

  //const idsociety = useAtomValue(societyAtom);
  //const id = idsociety!.id;

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
        <div className="graph_showsociety">
          <select value={selectedOption} onChange={handleSelectChange}>
            <option value="turnover">Turnover client</option>
            <option value="bar">Taxes</option>
            <option value="line">P & L</option>
            <option value="pie">Turnover product</option>
          </select>
          {selectedOption === 'turnover' && <DoughnutsCharts />}
          {selectedOption === 'bar' && <PolarCharts />}
          {selectedOption === 'line' && <RadarCharts />}
          {selectedOption === 'pie' && <PieCharts />}
        </div>
        <div className="rightinfosociety">
          <div className="indexinvoicesshowsociety">
            <IndexInvoices />
          </div>
          <div className="indexclientsshowsociety">
            <PageClientIndex />
          </div>
        </div>
        <div className="large_graph_showsociety">
          <select
            value={selectedOptionLarge}
            onChange={handleSelectChangeLarge}
          >
            <option value="globalturnover">Global turnover</option>
            <option value="global">Global</option>
            <option value="combined">Combined P & L</option>
          </select>
          {selectedOptionLarge === "globalturnover" && <LineCharts />}
          {selectedOptionLarge === "global" && <BarCharts />}
          {selectedOptionLarge === "combined" && <StackedCharts />}
        </div>
        {showEditSociety && (
          <div className="display_edit_and_new_societycontainer">
            <EditSociety closeEditModal={closeEditModal} />
            <button onClick={closeEditModal} className="closetag">
              ×
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowSociety;
