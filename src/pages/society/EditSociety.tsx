import { useState } from "react";
import Cookies from "js-cookie";
import { useAtomValue } from "jotai";

import societyAtom from "../../atom/societyAtom";
import { useNavigate } from "react-router-dom";

import "./society.scss";

const EditSociety = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  // const token = Cookies.get("token");
  const user_id = JSON.parse(Cookies.get("token")!).user_id;
  const navigate = useNavigate();

  const societyAtomValue = useAtomValue(societyAtom);

  // const [updateSuccess, setUpdateSuccess] = useState(false);
  // const [showEditSociety, setShowEditSociety] = useState("");

  const [name, setName] = useState(societyAtomValue.name);
  const [status, setStatus] = useState(societyAtomValue.status);
  const [adress, setAdress] = useState(societyAtomValue.adress);
  const [zip, setZip] = useState(societyAtomValue.zip);
  const [city, setCity] = useState(societyAtomValue.city);
  const [country, setCountry] = useState(societyAtomValue.country);
  const [capital, setCapital] = useState(societyAtomValue.capital);
  const [email, setEmail] = useState(societyAtomValue.email);
  const [, setErrors] = useState({});

  console.log("c'estl'atom", societyAtomValue.id);

  const HandleSubmitEditSociety = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrl + `societies/${societyAtomValue.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(Cookies.get("token")!).token,
        },
        body: JSON.stringify({
          society: {
            name: name,
            status: status,
            adress: adress,
            zip: zip,
            city: city,
            country: country,
            capital: capital,
            email: email,
            user_id: user_id,
          },
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        window.location.reload();
      } else {
        console.log("error responseData", responseData);
      }
    } catch (error) {
      setErrors({ generic: "No answer from server" });
    }
  };

  const onClick = async () => {
    try {
      const response = await fetch(apiUrl + `societies/${societyAtomValue.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(Cookies.get("token")!).token,
        },
      });

      if (response.ok) {
        navigate(`/profile`);
      } else {
        const error = await response.json();
        console.error(error);
      }
    } catch (error) {
      console.error("Error during delete society:", error);
    }
  };

  return (
    <div className="editsocietyform">
      <form onSubmit={HandleSubmitEditSociety}>
        <h2>You can update information's company here !</h2>
        <label>
          Company's name :
          <input
            type="text"
            name="name"
            value={name}
            placeholder={societyAtomValue.name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Company's social reason :
          <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="micro-entreprise">Micro</option>
            <option value="SASU">SASU</option>
            <option value="EURL">EURL</option>
            <option value="SARL">SARL</option>
            <option value="SAS">SAS</option>
            <option value="SA">SA</option>
          </select>
        </label>
        <br />
        <label>
          Address :
          <input
            type="text"
            name="adress"
            value={adress}
            placeholder={societyAtomValue.adress}
            onChange={(e) => setAdress(e.target.value)}
          />
        </label>
        <br />
        <label>
          Zip code :
          <input
            type="number"
            name="zip"
            value={zip}
            placeholder={societyAtomValue.zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </label>
        <br />
        <label>
          City :
          <input
            type="text"
            name="city"
            value={city}
            placeholder={societyAtomValue.city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <br />
        <label>
          Country :
          <input
            type="text"
            name="country"
            value={country}
            placeholder={societyAtomValue.country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <br />
        <label>
          Capital :
          <input
            type="text"
            name="capital"
            value={capital}
            placeholder={societyAtomValue.capital}
            onChange={(e) => setCapital(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email :
          <input
            type="text"
            name="email"
            value={email}
            placeholder={societyAtomValue.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <div className="buttonedit">
          <button className="savebuttoneditsociety">Save</button>
          <button onClick={onClick} className="deletebuttonsociety">
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSociety;
