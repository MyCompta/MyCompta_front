import { useState } from "react";
import Cookies from "js-cookie";
import { useSetAtom, useAtomValue } from "jotai";
import societyAtom from "../../atom/societyAtom";
import { useNavigate } from "react-router-dom";

import "./society.scss";

interface EditSocietyProps {
  closeEditModal?: () => void;
}

const EditSociety = ({ closeEditModal }: EditSocietyProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  // const token = Cookies.get("token");
  const user_id = JSON.parse(Cookies.get("token")!).user_id;
  const navigate = useNavigate();
  const setSocietyAtom = useSetAtom(societyAtom);
  const societyAtomValue = useAtomValue(societyAtom);

  // const [updateSuccess, setUpdateSuccess] = useState(false);
  // const [showEditSociety, setShowEditSociety] = useState("");

  const [name, setName] = useState(societyAtomValue!.name);
  const [status, setStatus] = useState(societyAtomValue!.status);
  const [siret, setSiret] = useState(societyAtomValue!.siret);
  const [address, setAddress] = useState(societyAtomValue!.address);
  const [zip, setZip] = useState(societyAtomValue!.zip);
  const [city, setCity] = useState(societyAtomValue!.city);
  const [country, setCountry] = useState(societyAtomValue!.country);
  const [capital, setCapital] = useState(societyAtomValue!.capital);
  const [email, setEmail] = useState(societyAtomValue!.email);
  const [errors, setErrors] = useState({
    name: "",
    address: "",
    capital: "",
    city: "",
    country: "",
    email: "",
    siret: "",
    zip: "",
    generic: "",
  });

  const HandleSubmitEditSociety = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        apiUrl + `societies/${societyAtomValue!.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(Cookies.get("token")!).token,
          },
          body: JSON.stringify({
            society: {
              id: societyAtomValue!.id,
              name: name,
              status: status,
              siret: siret,
              address: address,
              zip: zip,
              city: city,
              country: country,
              capital: capital,
              email: email,
              user_id: user_id,
            },
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setSocietyAtom(responseData);
        closeEditModal!();
        navigate(`/societies/${responseData.id}`);
      } else {
        setErrors(responseData);
      }
    } catch (error) {
      setErrors((prevError) => {
        return { ...prevError, generic: "No answer from server" };
      });
    }
  };

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      const response = await fetch(
        apiUrl + `societies/${societyAtomValue!.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(Cookies.get("token")!).token,
          },
        }
      );

      if (response.ok) {
        navigate(`/dashboard`);
      } else {
        const error = await response.json();
        console.error(error);
      }
    } catch (error) {
      console.error("Error during delete society:", error);
    }
  };

  return (
    <div className="edit-society-form-container">
      <h2>Edit society's information</h2>
      <p className="edit-society-form-container__info">
        <span>* </span>indicates a required field
      </p>
      <form onSubmit={HandleSubmitEditSociety} className="edit-society-form">
        <label>
          Society's name<span> *</span>
        </label>
        <input
          type="text"
          name="name"
          value={name}
          placeholder={societyAtomValue!.name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors && errors.name && (
          <span className="error-message">Society's name {errors.name}</span>
        )}

        <label>
          Society's legal status<span> *</span>
        </label>
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="micro-entreprise">Micro</option>
          <option value="SASU">SASU</option>
          <option value="EURL">EURL</option>
          <option value="SARL">SARL</option>
          <option value="SAS">SAS</option>
          <option value="SA">SA</option>
        </select>

        <label>
          Siret<span> *</span>
        </label>
        <input
          type="number"
          name="siret"
          value={siret}
          placeholder={String(societyAtomValue!.siret)}
          onChange={(e) => setSiret(parseInt(e.target.value))}
        />
        {errors && errors.siret && (
          <span className="error-message">Siret {errors.siret}</span>
        )}

        <label>
          Capital<span> *</span>
        </label>
        <input
          type="text"
          name="capital"
          value={capital}
          placeholder={String(societyAtomValue!.capital)}
          onChange={(e) => setCapital(parseInt(e.target.value))}
        />
        {errors && errors.capital && (
          <span className="error-message">Capital {errors.capital}</span>
        )}

        <label>
          Email<span> *</span>
        </label>
        <input
          type="text"
          name="email"
          value={email}
          placeholder={societyAtomValue!.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors && errors.email && (
          <span className="error-message">Email {errors.email}</span>
        )}

        <label>
          Address<span> *</span>
        </label>
        <input
          type="text"
          name="address"
          value={address}
          placeholder={societyAtomValue!.address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors && errors.address && (
          <span className="error-message">Address {errors.address}</span>
        )}

        <label>
          Zip code<span> *</span>
        </label>
        <input
          type="number"
          name="zip"
          value={zip}
          placeholder={String(societyAtomValue!.zip)}
          onChange={(e) => setZip(parseInt(e.target.value))}
        />
        {errors && errors.zip && (
          <span className="error-message">Zip code {errors.zip}</span>
        )}

        <label>
          City<span> *</span>
        </label>
        <input
          type="text"
          name="city"
          value={city}
          placeholder={societyAtomValue!.city}
          onChange={(e) => setCity(e.target.value)}
        />
        {errors && errors.city && (
          <span className="error-message">City {errors.city}</span>
        )}

        <label>
          Country<span> *</span>
        </label>
        <input
          type="text"
          name="country"
          value={country}
          placeholder={societyAtomValue!.country}
          onChange={(e) => setCountry(e.target.value)}
        />
        {errors && errors.country && (
          <span className="error-message">Country {errors.country}</span>
        )}

        <button className="btn edit-society-form__btn">Save</button>
        <button className="edit-society-form__delete" onClick={onClick}>
          Delete the society
        </button>
      </form>
    </div>
  );
};

export default EditSociety;
