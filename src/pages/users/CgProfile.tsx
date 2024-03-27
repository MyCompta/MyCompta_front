import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import IndexSocieties from "../society/IndexSocieties";

import "./users.scss";

const CgProfile = () => {
  const [userData, setUserData] = useState<TUserShowBack>();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get("token");
  const id = token ? JSON.parse(token).user_id : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + `users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(Cookies.get("token")!).token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          const { error } = await response.json();
          console.error(error);
        }
      } catch (error) {
        console.error("Erreur lors de la sélection des données :", error);
      }
    };

    fetchData();
  }, [apiUrl, id]);


  // console.log("user data dans cgprofile",userData)


  const onClickDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure to delete entire profile?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(apiUrl + `users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(Cookies.get("token")!).token,
          },
        });

        if (response.ok) {
          Cookies.remove("token");
          navigate(`/`);
        } else {
          const error = await response.json();
          console.error(error);
        }
      } catch (error) {
        console.error("Error during delete profil:", error);
      }
    }
  };

  return (
    <div>
      <h1> Your user's profile</h1>

      {userData && (
        <div className="profileuser">
          <p>Email : {userData.email}</p>
          <p>
            Date of creation :{" "}
            {new Date(Date.parse(userData.created_at)).toLocaleDateString()}
          </p>
          <p>
            Last uptdate :{" "}
            {new Date(Date.parse(userData.updated_at)).toLocaleDateString()}
          </p>
        </div>
      )}

      <div className="indexsocieties">
        <IndexSocieties />
      </div>

      <button onClick={onClickDelete} className="deleteprofilebutton">
        Delete profile
      </button>
    </div>
  );
};

export default CgProfile;
