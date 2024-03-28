import { useState } from "react";
import Cookies from "js-cookie";
import { useSetAtom, useAtomValue } from "jotai";
import societyAtom from "../../atom/societyAtom";
import { useNavigate } from "react-router-dom";

import "./society.scss";

const EditSociety = ({ closeEditModal }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  // const token = Cookies.get("token");
  const user_id = JSON.parse(Cookies.get("token")!).user_id;
  const navigate = useNavigate();
  const setSocietyAtom = useSetAtom(societyAtom);
  const societyAtomValue = useAtomValue(societyAtom);

  // const [updateSuccess, setUpdateSuccess] = useState(false);
  // const [showEditSociety, setShowEditSociety] = useState("");

  const [name, setName] = useState(societyAtomValue.name);
  const [status, setStatus] = useState(societyAtomValue.status);
  const [address, setAddress] = useState(societyAtomValue.address);
  const [zip, setZip] = useState(societyAtomValue.zip);
  const [city, setCity] = useState(societyAtomValue.city);
  const [country, setCountry] = useState(societyAtomValue.country);
  const [capital, setCapital] = useState(societyAtomValue.capital);
  const [email, setEmail] = useState(societyAtomValue.email);
  const [errors, setErrors] = useState({name: "", address: "", capital: "", city: "", country: "", email: "", siret: "", zip: "", generic: "" });



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
            id:societyAtomValue.id,
            name: name,
            status: status,
            address: address,
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
        setSocietyAtom(responseData);
        console.log("responseDAta dans edit", responseData);
        console.log("Nouvel état de societyAtom dans edit :", responseData);
        closeEditModal();
        navigate(`/societies/${responseData.name}`);
      } else {
        setErrors(responseData);
      }
    } catch (error) {
      setErrors(prevError => { return {...prevError, generic: "No answer from server" }});
    }
  };

  const onClick = async (e) => {
    e.stopPropagation();

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
        <label>Company's name :</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder={societyAtomValue.name}
            onChange={(e) => setName(e.target.value)}
          />&nbsp;&nbsp;&nbsp;
        {errors && errors.name && <span className="error-message">Company's name {errors.name}</span>}
      
        <br />
        <label>Company's social reason :</label>
          <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="micro-entreprise">Micro</option>
            <option value="SASU">SASU</option>
            <option value="EURL">EURL</option>
            <option value="SARL">SARL</option>
            <option value="SAS">SAS</option>
            <option value="SA">SA</option>
          </select>
        <br />

        <label>Address :</label>
          <input
            type="text"
            name="address"
            value={address}
            placeholder={societyAtomValue.address}
            onChange={(e) => setAddress(e.target.value)}
          />&nbsp;&nbsp;&nbsp;
        {errors && errors.address && <span className="error-message">Address {errors.address}</span>}

        <br />
        <label>Zip code :</label>
          <input
            type="number"
            name="zip"
            value={zip}
            placeholder={societyAtomValue.zip}
            onChange={(e) => setZip(e.target.value)}
          />&nbsp;&nbsp;&nbsp;
        {errors && errors.zip && <span className="error-message">Zip code {errors.zip}</span>}

        <br />
        <label>City :</label>
          <input
            type="text"
            name="city"
            value={city}
            placeholder={societyAtomValue.city}
            onChange={(e) => setCity(e.target.value)}
          />&nbsp;&nbsp;&nbsp;
        {errors && errors.city && <span className="error-message">City {errors.city}</span>}

        <br />
        <label>Country :</label>
          <input
            type="text"
            name="country"
            value={country}
            placeholder={societyAtomValue.country}
            onChange={(e) => setCountry(e.target.value)}
          />&nbsp;&nbsp;&nbsp;
        {errors && errors.country && <span className="error-message">Country {errors.country}</span>}
        
        <br />
        <label>Capital :</label>
          <input
            type="text"
            name="capital"
            value={capital}
            placeholder={societyAtomValue.capital}
            onChange={(e) => setCapital(e.target.value)}
          />&nbsp;&nbsp;&nbsp;
        {errors && errors.capital && <span className="error-message">Capital {errors.capital}</span>}

        <br />
        <label>Email :</label>
          <input
            type="text"
            name="email"
            value={email}
            placeholder={societyAtomValue.email}
            onChange={(e) => setEmail(e.target.value)}
          />&nbsp;&nbsp;&nbsp;
        {errors && errors.email && <span className="error-message">Email {errors.email}</span>}

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
