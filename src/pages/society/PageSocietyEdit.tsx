import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import fetcher from "../../utils/fetcher";
import Cookies from "js-cookie";
import { useAtom, useSetAtom } from "jotai";
import { currentUserSocietiesAtom } from "../../atom/societyAtom";
import { successAtom } from "../../atom/notificationAtom";
import { useParams } from "react-router-dom";

const PageSocietyEdit = () => {
  const [currentUserSocieties, setCurrentUserSocieties] = useAtom(
    currentUserSocietiesAtom
  );
  const setSuccess = useSetAtom(successAtom);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
    setValue,
  } = useForm<FormValues>();
  const [societyToEdit, setSocietyToEdit] = useState(
    currentUserSocieties.find((society) => society.id === parseInt(id!))
  );

  useEffect(() => {
    setSocietyToEdit(
      currentUserSocieties.find((society) => society.id === parseInt(id!))
    );
  }, [id, currentUserSocieties]);

  useEffect(() => {
    if (societyToEdit) {
      setValue("name", societyToEdit.name);
      setValue("siret", societyToEdit.siret);
      setValue("status", societyToEdit.status);
      setValue("capital", societyToEdit.capital);
      setValue("email", societyToEdit.email);
      setValue("address", societyToEdit.address);
      setValue("zip", societyToEdit.zip);
      setValue("city", societyToEdit.city);
      setValue("country", societyToEdit.country);
    }
  }, [setValue, societyToEdit]);

  type FormValues = {
    name: string;
    status: string;
    siret: number;
    capital: number;
    email: string;
    address: string;
    zip: number;
    city: string;
    country: string;
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    formData.append(
      "society[user_id]",
      JSON.parse(Cookies.get("token")!).user_id
    );
    formData.append("society[name]", data.name!);
    formData.append("society[status]", data.status!);
    formData.append("society[siret]", data.siret!.toString());
    formData.append("society[capital]", data.capital!.toString());
    formData.append("society[email]", data.email!);
    formData.append("society[address]", data.address!);
    formData.append("society[zip]", data.zip!.toString());
    formData.append("society[city]", data.city!);
    formData.append("society[country]", data.country!);
    try {
      const response = await fetcher(`/societies/${id}`, formData, "PUT", true);
      if (!response.error) {
        {
          /*}
        const updatedSocieties = currentUserSocieties.map((society) => {
          if (society.id === parseInt(id!)) {
            return {
              ...society,
              response,
            };
          }
          return society;
        });
      */
        }
        setCurrentUserSocieties([response]);
        console.log("Society updated successfully");
        setSuccess("Society updated successfully");
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données :", error);
    }
  };

  useEffect(() => {
    console.log("currentUserSocieties", currentUserSocieties);
  }, [currentUserSocieties]);

  if (!societyToEdit) return <p>Loading...</p>;

  return (
    <>
      <div className="modal-client-header">
        <h1>Edit your soceity</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="client-form-container">
        <p className="client-form__info">
          <span>* </span>indicates a required field
        </p>
        <div className="client-form">
          <div className="client-form__row1">
            <label htmlFor="name">
              Society name<span> *</span>
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Society name here"
              autoComplete="current-name"
            />

            <label htmlFor="siret">
              Siret<span> *</span>
            </label>
            <input
              type="number"
              {...register("siret")}
              placeholder="Siret here"
              autoComplete="current-siret"
            />

            <label htmlFor="status">
              Status<span> *</span>
            </label>
            <Controller
              name="status"
              control={control}
              defaultValue={""} // Assurez-vous de définir une valeur par défaut si nécessaire
              render={({ field }) => (
                <select {...field}>
                  <option value="">Select status</option>
                  <option value="micro-entreprise">Micro</option>
                  <option value="SASU">SASU</option>
                  <option value="EURL">EURL</option>
                  <option value="SARL">SARL</option>
                  <option value="SAS">SAS</option>
                  <option value="SA">SA</option>
                </select>
              )}
            />

            <label htmlFor="capital">Capital</label>
            <input
              type="number"
              {...register("capital")}
              placeholder="Capital here"
              autoComplete="current-capital"
            />

            <label htmlFor="email">
              Email<span> *</span>
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Email here"
              autoComplete="current-email"
            />
          </div>

          <div className="client-form__row2">
            <label htmlFor="address">
              Address<span> *</span>
            </label>
            <input
              type="text"
              {...register("address")}
              placeholder="Address here"
              autoComplete="current-address"
            />

            <label htmlFor="zip">
              Zip Code<span> *</span>
            </label>
            <input
              type="number"
              {...register("zip")}
              placeholder="Zip code here"
              autoComplete="current-zip"
            />

            <label htmlFor="city">
              City<span> *</span>
            </label>
            <input
              type="text"
              {...register("city")}
              placeholder="City here"
              autoComplete="current-city"
            />

            <label htmlFor="country">
              Country<span> *</span>
            </label>
            <input
              type="text"
              {...register("country")}
              placeholder="Country here"
              autoComplete="current-country"
            />
          </div>
        </div>

        <input
          type="submit"
          value="Save changes"
          className="btn client-form__submit"
        />
      </form>
    </>
  );
};

export default PageSocietyEdit;
