import { useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { Link } from "react-router-dom"
import Cookies from 'js-cookie'

import {societyAtom } from '../../atom/societyAtom.jsx'

const apiUrl = import.meta.env.VITE_API_URL
const token = Cookies.get("token");


const IndexSocieties = () => {

  const [societyData, setSocietyData] = useAtom(societyAtom);
  const [,setError] = useState('');



  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(apiUrl + "societies",
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
            setError('unavailable list of societies')
          }
        } catch (error) {
        setError('no answer from server')
        }
      }

    fetchData()
    
  },[]);

  // console.log("cookies dans indexsocieties", token)
  // console.log("liste des societes en réponse", societyAtom)
  



  return (
    <div>
      <h1>Ceci est la page de l'index des sociétés</h1>

      {societyData.length > 0 ? (
        <div>
          {societyData.map((societyItem, index) => (
            <li key={index}>
            <Link to={`/dashboard/${societyItem.name}`}>
              {societyItem.name}
            </Link>
          </li>
          ))}
        </div>
      ) : (
        <p>No societies available</p>
      )}


    </div>
  )
}

export default IndexSocieties;


