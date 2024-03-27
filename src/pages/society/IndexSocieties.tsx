import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useSetAtom } from "jotai";

import NewSociety from "../../components/society/NewSociety";
import CreateSociety from "./CreateSociety";
import societyAtom from "../../atom/societyAtom";

import "./society.scss";

const apiUrl = import.meta.env.VITE_API_URL;
// const token = Cookies.get("token");

const IndexSocieties = () => {
  const [societyData, setSocietyData] = useState<TSocietyBack[]>([]);
  const [, setError] = useState("");
  const [showCreateSociety, setShowCreateSociety] = useState(false);
  const setSocietyAtom = useSetAtom(societyAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + "societies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(Cookies.get("token")!).token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSocietyData(data);
        } else {
          setError("unavailable list of societies");
        }
      } catch (error) {
        setError("no answer from server");
      }
    };

    fetchData();
  }, []);

  const handleNewSocietyClick = () => {
    setShowCreateSociety(true);
  };

  const closeCreateModal = () => {
    setShowCreateSociety(false);
  };


  return (
    <div className="societycontainer">
      <div className="header">
        <h2 style={{ display: "inline-block" }}>My Companies</h2>
        <NewSociety onClick={handleNewSocietyClick} />
      </div>

      <div className="main_indexsocieties">
        <div className="companylist">
          {societyData.length > 0 ? (
            <div>
              {societyData.map((societyItem, index) => (
                <li key={index}>
                  <Link
                    to={`/societies/${societyItem.name}`}
                    onClick={() => setSocietyAtom({ ...societyItem, id: societyItem.id })}>
                    {societyItem.name.toUpperCase()}
                  </Link>
                </li>
              ))}
            </div>
          ) : (
            <p>No societies available</p>
          )}
        </div>

        
          {showCreateSociety && (
            <div className="display_edit_and_new_societycontainer">
              <CreateSociety />
              <button onClick={closeCreateModal} className="closetag">
                X
              </button>
            </div>
          )}
        </div>
      </div>
  );
};

export default IndexSocieties;
