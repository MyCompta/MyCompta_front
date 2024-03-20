import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useAtom } from 'jotai'

import fetcher from "../../utils/fetcher";
import { societyAtom } from '../../atom/societyAtom.jsx';

const apiUrl = import.meta.env.VITE_API_URL
const token = Cookies.get("token");

console.log("token dans showsociety", token)


const ShowSociety = () => {
  const { id } = useParams();
  const [society, setSociety] = useAtom(societyAtom);
  const [societyData, setSocietyData] = useState([]);
  const navigate = useNavigate();

  console.log("societyAtom dans showsocieties", society)

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
          } else {
          console.error(response.error);
          }
      } catch (error) {
        console.error("Erreur lors de la sélection des données :", error);
      }
    };

    fetchData();
  }, [id]);

  // console.log("societyData dans showsociety", societyData)

  


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

  return (
    <>
      <h1>{societyData.name} {societyData.status}</h1>
      <button><Link to="/dashboard">Back to dashboard</Link></button>
      <button><Link to={`/society/${id}/edit`}>Edit</Link></button>
      <button onClick={onClick}>Delete</button>

      <div>
        Capital: {societyData.capital}<br />
        Address: {societyData.adress}<br />
        Zip code: {societyData.zip}<br />
        City: {societyData.city}<br />
        Country: {societyData.country}<br />
        Siret n°: {societyData.siret}<br />
        email: {societyData.email}<br />
         
      </div>

    </>
  );
};

export default ShowSociety;


