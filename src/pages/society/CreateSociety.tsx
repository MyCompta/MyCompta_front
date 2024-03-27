import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { currentSocietyAtom } from "../../atom/societyAtom";

import "./society.scss";

const CreateSociety = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  // const token = Cookies.get("token");
  const user_id = JSON.parse(Cookies.get("token")!).user_id;
  const currentSociety = useAtomValue(currentSocietyAtom);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("micro-entreprise");
  const [adress, setAdress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [siret, setSiret] = useState("");
  const [capital, setCapital] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ name: "", generic: "" });

  // const [creationSuccess, setCreationSuccess] = useState(false);

  // console.log("dans le create", token)
  // console.log("user token id", user_id)

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
            adress: adress,
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

      const responseData = await response.json();

      if (response.ok) {
        window.location.reload();
      } else {
        setErrors(responseData);
      }
    } catch (error) {
      setErrors((error) => {
        return { ...error, generic: "No answer from server" };
      });
    }
  };

  return (
    <div className="createsocietyform">
      <form onSubmit={HandleSubmitCreateSociety}>
        <div className="createsocietyformtitle">
          {currentSociety ? (
            <h2>
              You can create company here ! <br /> whao!
            </h2>
          ) : (
            <h2>Add your society to continue</h2>
          )}
        </div>
        <div className="createsocietyinput">
          <label>
            Company's name :&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              name="name"
              value={name}
              placeholder={"name of your company"}
              onChange={(e) => setName(e.target.value)}
              className={errors && errors.name ? "error" : ""}
            />
          </label>
          <br />
          <label>
            Company's social reason :&nbsp;&nbsp;&nbsp;&nbsp;
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
          </label>
          <br />
          <label>
            Address :&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              name="adress"
              value={adress}
              placeholder={"adress of your company"}
              onChange={(e) => setAdress(e.target.value)}
              className={errors && errors.name ? "error" : ""}
            />
          </label>
          <br />
          <label>
            Zip code :&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="number"
              name="zip"
              value={zip}
              placeholder={"zip code"}
              onChange={(e) => setZip(e.target.value)}
              className={errors && errors.name ? "error" : ""}
            />
          </label>
          <br />
          <label>
            City :&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              name="city"
              value={city}
              placeholder={"city"}
              onChange={(e) => setCity(e.target.value)}
              className={errors && errors.name ? "error" : ""}
            />
          </label>
          <br />
          <label>
            Country :&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              name="country"
              value={country}
              placeholder={"country name"}
              onChange={(e) => setCountry(e.target.value)}
              className={errors && errors.name ? "error" : ""}
            />
          </label>
          <br />
          <label>
            Siret :&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              name="siret"
              value={siret}
              placeholder={"13 digits"}
              onChange={(e) => setSiret(e.target.value)}
              className={errors && errors.name ? "error" : ""}
            />
          </label>
          <br />
          <label>
            Capital :&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              name="capital"
              value={capital}
              placeholder={"capital"}
              onChange={(e) => setCapital(e.target.value)}
              className={errors && errors.name ? "error" : ""}
            />
          </label>
          <br />
          <label>
            Email :&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              name="email"
              value={email}
              placeholder={"your company's email"}
              onChange={(e) => setEmail(e.target.value)}
              className={errors && errors.name ? "error" : ""}
            />
          </label>
        </div>
        <br />
        <button>Create society</button>
      </form>
    </div>
  );
};

export default CreateSociety;
