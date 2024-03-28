import { useState } from "react";
import Cookies from "js-cookie";
import { currentSocietyAtom } from "../../atom/societyAtom";
import { useNavigate } from "react-router-dom";
import { useSetAtom, useAtom } from "jotai";

import { successAtom } from "../../atom/notificationAtom";

import societyAtom from "../../atom/societyAtom";
import "./society.scss";

const CreateSociety = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const user_id = JSON.parse(Cookies.get("token")!).user_id;
  const [currentSociety, setCurrentSociety] = useAtom(currentSocietyAtom);
  const setSociety = useSetAtom(societyAtom);
  const setSuccess = useSetAtom(successAtom);
  const setSocietyAtom = useSetAtom(societyAtom);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("micro-entreprise");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [siret, setSiret] = useState("");
  const [capital, setCapital] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<ErrorRes>({
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

  type ErrorRes = {
    name: string;
    address: string;
    capital: string;
    city: string;
    country: string;
    email: string;
    siret: string;
    zip: string;
    generic: string;
  };

  // console.log("dans le create", token)
  // console.log("user token id", user_id)

  console.log("errors dans createsociety", errors);

  const HandleSubmitCreateSociety = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrl + "societies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(Cookies.get("token")!).token,
        },
        body: JSON.stringify({
          society: {
            name: name,
            status: status,
            address: address,
            zip: zip,
            city: city,
            country: country,
            siret: siret,
            capital: capital,
            email: email,
            user_id: user_id,
          },
        }),
      });

      if (response.ok) {
        const responseData = (await response.json()) as TSocietyBack;
        console.log("Your society has been created");
        setSocietyAtom(responseData);
        setSuccess("Your society has been created");

        navigate(`/societies/${responseData.id}`);

        Cookies.set("currentSociety", String(responseData.id));
        setCurrentSociety(String(responseData.id));

        setSociety(
          (prevSociety) =>
            ({
              ...prevSociety,
              id: responseData.id,
              name: responseData.name,
              address: responseData.address,
              zip: responseData.zip,
              city: responseData.city,
              country: responseData.country,
              siret: responseData.siret,
              status: responseData.status,
              capital: responseData.capital,
              email: responseData.email,
            }) as TSocietyBack
        );
      } else {
        const responseData = (await response.json()) as ErrorRes;
        setErrors(responseData);
      }
    } catch (error) {
      setErrors((error) => {
        return { ...error, generic: "No answer from server" };
      });
    }
  };

  return (
    <div className="create-society-form-container">
      {currentSociety ? <h2>Add another society</h2> : <h2>Add your society to continue</h2>}
      <p className="create-society-form-container__info">
        <span>* </span>indicates a required field
      </p>
      <form onSubmit={HandleSubmitCreateSociety} className="create-society-form">
        <div className="create-society-form-rows">
          <div className="create-society-form-rows__row1">
            <label>
              Society's name<span> *</span>
            </label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder={"name of your company"}
              onChange={(e) => setName(e.target.value)}
            />

            <label>
              Society's social reason<span> *</span>
            </label>
            <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
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
              type="text"
              name="siret"
              value={siret}
              placeholder={"13 digits"}
              onChange={(e) => setSiret(e.target.value)}
            />
            {errors && errors.siret && <span className="error-message">Siret {errors.siret}</span>}

            <label>
              Capital<span> *</span>
            </label>
            <input
              type="text"
              name="capital"
              value={capital}
              placeholder={"capital"}
              onChange={(e) => setCapital(e.target.value)}
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
              placeholder={"your company's email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors && errors.email && <span className="error-message">Email {errors.email}</span>}
          </div>

          <div className="create-society-form-rows__row2">
            <label>
              Address<span> *</span>
            </label>
            <input
              type="text"
              name="address"
              value={address}
              placeholder={"adress of your company"}
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
              placeholder={"zip code"}
              onChange={(e) => setZip(e.target.value)}
              className={errors && errors.name ? "error" : ""}
            />
            {errors && errors.zip && <span className="error-message">Zip code {errors.zip}</span>}

            <label>
              City<span> *</span>
            </label>
            <input
              type="text"
              name="city"
              value={city}
              placeholder={"city"}
              onChange={(e) => setCity(e.target.value)}
              className={errors && errors.name ? "error" : ""}
            />
            {errors && errors.city && <span className="error-message">City {errors.city}</span>}

            <label>
              Country<span> *</span>
            </label>
            <input
              type="text"
              name="country"
              value={country}
              placeholder={"country name"}
              onChange={(e) => setCountry(e.target.value)}
            />
            {errors && errors.country && (
              <span className="error-message">Country {errors.country}</span>
            )}
          </div>
        </div>
        <button className="btn">Create society</button>
      </form>
    </div>
  );
};

export default CreateSociety;
