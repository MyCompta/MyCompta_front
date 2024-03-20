import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useAtom } from 'jotai';


import fetcher from "../../utils/fetcher";

import EditComponentSociety from '../../components/society/EditComponentSociety.jsx';
import EditSociety from './EditSociety.jsx';
import societyAtom from '../../atom/societyAtom.jsx'


const apiUrl = import.meta.env.VITE_API_URL
const token = Cookies.get("token");


const ShowSociety = () => {
  
  const [showEditSociety, setShowEditSociety] = useState(false);
  const [societyData, setSocietyData] = useState([]);
  const [, setAtomData] = useAtom(societyAtom);
  const navigate = useNavigate();

  const id = localStorage.getItem('selectedSocietyId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + `societies/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": JSON.parse(Cookies.get("token")).token,
            }
          });
          if(response.ok) {
            const data = await response.json();
            setSocietyData(data);
            setAtomData(data)
          } else {
          console.error(response.error);
          }
      } catch (error) {
        console.error("Erreur lors de la sélection des données :", error);
      }
    };

    fetchData();
  }, [societyAtom]);

  

  


  const onClick = async () => {
    try {
      const response = await fetch(apiUrl + `societies/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": JSON.parse(Cookies.get("token")).token,
            }
          });

      if (response.ok) {
        navigate(`/dashboard`);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Error during delete society:", error.message);
    }
  };

  const handleEditSocietyClick = () => {
    setShowEditSociety(true);
  }
  return (
    <>
      <h1>{societyData.name} {societyData.status}</h1>
      <div> 
        <button><Link to="/dashboard">Back to dashboard</Link></button>
        <EditComponentSociety onClick={handleEditSocietyClick} className="buttoneditsociety"/><br />
        <button onClick={onClick}>Delete</button>
      </div>

      <div>
        Capital: {societyData.capital}<br />
        Address: {societyData.adress}<br />
        Zip code: {societyData.zip}<br />
        City: {societyData.city}<br />
        Country: {societyData.country}<br />
        Siret n°: {societyData.siret}<br />
        email: {societyData.email}<br />
         
      </div>

      <div className="displaycreatesocietycontainer">
        {showEditSociety && <div><EditSociety /></div>}
      </div>

    </>
  );
};

export default ShowSociety;


