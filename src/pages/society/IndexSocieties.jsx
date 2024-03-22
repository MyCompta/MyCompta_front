import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

import NewSociety from '../../components/society/NewSociety.jsx';
import CreateSociety from './CreateSociety.jsx';

import './society.scss'

const apiUrl = import.meta.env.VITE_API_URL;
const token = Cookies.get("token");

const IndexSocieties = () => {
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
  }, []);

  const handleNewSocietyClick = () => {
    setShowCreateSociety(true);
  }

  const handleSocietyClick = (id) => {
    localStorage.setItem('selectedSocietyId', id);
  }

  return (
    <div className="societycontainer">
      <div className="header">
        <h2 style={{ display: 'inline-block' }}>My Companies</h2>
        <NewSociety onClick={handleNewSocietyClick}/>
      </div>

      <div className="main">
        <div className="companylist">
          {societyData.length > 0 ? (
            <div>
              {societyData.map((societyItem, index) => (
                <li key={index}>
                  <Link to={`/society/${societyItem.name}`} onClick={() => handleSocietyClick(societyItem.id)} >
                    {societyItem.name.toUpperCase()}
                  </Link>
                </li>
              ))}
            </div>
          ) : (
            <p>No societies available</p>
          )}
        </div>

        <div className="displaycreatesocietycontainer">
          {showCreateSociety && <div><CreateSociety /></div>}
        </div>
      </div>
    </div>
  )
}

export default IndexSocieties;