import React, {useState, useEffect} from 'react';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import IndexSocieties from "../society/IndexSocieties"

import "./users.scss"

const apiUrl = import.meta.env.VITE_API_URL;
const token = Cookies.get("token");
const id = token ? JSON.parse(token).user_id : null;


const CgProfile =() => {

  const [userData, setUserData] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + `users/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": JSON.parse(Cookies.get("token")).token,
            }
          });
          if(response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
          console.error(response.error);
          }
      } catch (error) {
        console.error("Erreur lors de la sélection des données :", error);
      }
    };

    fetchData();
  }, [setUserData]);

  // console.log(userData)

  const onClickDelete = async () => {

    const confirmDelete = window.confirm("Are you sure to delete entire profile?");

    if(confirmDelete) {
      try {
        const response = await fetch(apiUrl + `users/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "Authorization": JSON.parse(Cookies.get("token")).token,
              }
            });

        if (response.ok) {
          Cookies.remove('token');
          navigate(`/`);           
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error("Error during delete profil:", error.message);
      }
    }
  };




  return (
    <div>
      <h1> Ceci est la page profile user</h1>

      <div className="profileuser">
        <p>Email : {userData.email}</p>
        <p>Date of creation : {userData.created_at}</p>
        <p>Last uptdate : {userData.updated_at}</p>
      </div>

      <div className="indexsocieties">
        <IndexSocieties />
      </div>
      
      <button onClick={onClickDelete} className="deleteprofilebutton">Delete profile</button>

    </div>
  )
};


export default CgProfile;