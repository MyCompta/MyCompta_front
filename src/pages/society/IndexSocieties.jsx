import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { societyAtom } from '../../atom/societyAtom.jsx';

import NewSociety from '../../components/society/NewSociety.jsx';
import CreateSociety from './CreateSociety.jsx';
import './society.css'

const apiUrl = import.meta.env.VITE_API_URL;
const token = Cookies.get("token");

const IndexSocieties = () => {
  const [society] = useAtom(societyAtom);
  const [societyData, setSocietyData] = useState('');
  const [, setError] = useState('');
  const [showCreateSociety, setShowCreateSociety] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + "societies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.parse(Cookies.get("token")).token,
          }
        });

        if (response.ok) {
          const data = await response.json();
          setSocietyData(data);
        } else {
          setError('unavailable list of societies');
        }
      } catch (error) {
        setError('no answer from server');
      }
    }

    fetchData();
  }, [society]);

  const handleNewSocietyClick = () => {
    setShowCreateSociety(true);
  }

  return (
    <div className="societycontainer">
      <div className="sideleft">
      <h2>My Companies</h2><br />
      
      <NewSociety onClick={handleNewSocietyClick} className="buttonnewsociety"/><br />

      {societyData.length > 0 ? (
        <div>
          {societyData.map((societyItem, index) => (
            <li key={index}>
              <Link to={`/societies/${societyItem.id}`}>
                {societyItem.name}
              </Link>
            </li>
          ))}
        </div>
      ) : (
        <p>No societies available</p>
      )}
      </div>

      <div className="displaysocietycontainer">
        {showCreateSociety && <div><CreateSociety /></div>}
      </div>
    </div>
  )
}

export default IndexSocieties;