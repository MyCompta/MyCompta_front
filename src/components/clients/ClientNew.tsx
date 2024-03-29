import { useForm } from "react-hook-form";
import fetcher from "../../utils/fetcher";
import Cookies from "js-cookie";
import { useSetAtom } from "jotai";
import { newClientModalStatusAtom } from "../../atom/modalAtom";
import { clientAtom } from "../../atom/clientAtom";
import { successAtom } from "../../atom/notificationAtom";

export type FormValues = {
  business_name: string;
  first_name: string;
  last_name: string;
  siret: string;
  address: string;
  zip: number;
  city: string;
};

const ClientNew = () => {
  const setNewClientModalStatus = useSetAtom(newClientModalStatusAtom);
  const setClientsData = useSetAtom(clientAtom);
  const setSuccess = useSetAtom(successAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    formData.append(
      "client[user_id]",
      JSON.parse(Cookies.get("token")!).user_id
    );
    formData.append("client[society_id]", Cookies.get("currentSociety")!);
    formData.append("client[business_name]", data.business_name);
    formData.append("client[first_name]", data.first_name);
    formData.append("client[last_name]", data.last_name);
    formData.append("client[siret]", data.siret);
    formData.append("client[address]", data.address);
    formData.append("client[zip]", String(data.zip));
    formData.append("client[city]", data.city);
    formData.append("client[is_pro]", data.siret ? "true" : "false");

    try {
      const response = await fetcher("clients", formData, "POST", true);
      if (!response.error) {
        console.log("response : ", response);
        setClientsData((prevClients) => [...prevClients, response]);
        console.log("Client created successfully");
        setSuccess("Client created successfully");
        setNewClientModalStatus(false);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  return (
    <>
      <div className="modal-client-header">
        <h1>New client</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="client-form-container">
        <p className="client-form__info">
          <span>* </span>indicates a required field
        </p>
        <div className="client-form">
          <div className="client-form__row1">
            <label htmlFor="business_name">
              Business Name<span> *</span>
            </label>
            <input
              type="text"
              {...register("business_name", {
                required: true,
              })}
              placeholder="Business name here"
              autoComplete="current-business-name"
            />
            {errors.business_name &&
              errors.business_name.type === "required" && (
                <p>Business name can not be empty</p>
              )}

            <label htmlFor="siret">
              Siret<span> *</span>
            </label>
            <input
              type="number"
              {...register("siret", {
                required: true,
              })}
              placeholder="Siret here"
              autoComplete="current-siret"
            />
            {errors.siret && errors.siret.type === "required" && (
              <p>Siret can not be empty</p>
            )}

            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              {...register("first_name")}
              placeholder="First name here"
              autoComplete="current-first_name"
            />

            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              {...register("last_name")}
              placeholder="Last name here"
              autoComplete="current-last_name"
            />
          </div>

          <div className="client-form__row2">
            <label htmlFor="address">
              Address<span> *</span>
            </label>
            <input
              type="text"
              {...register("address", {
                required: true,
              })}
              placeholder="Address here"
              autoComplete="current-address"
            />
            {errors.address && errors.address.type === "required" && (
              <p>Address can not be empty</p>
            )}

            <label htmlFor="zip">
              Zip Code<span> *</span>
            </label>
            <input
              type="number"
              {...register("zip", {
                required: true,
              })}
              placeholder="Zip code here"
              autoComplete="current-zip"
            />
            {errors.zip && errors.zip.type === "required" && (
              <p>Zip code can not be empty</p>
            )}

            <label htmlFor="city">
              City<span> *</span>
            </label>
            <input
              type="text"
              {...register("city", {
                required: true,
              })}
              placeholder="City here"
              autoComplete="current-city"
            />
            {errors.city && errors.city.type === "required" && (
              <p>City can not be empty</p>
            )}
          </div>
        </div>

        <input
          type="submit"
          value="Create"
          className="btn client-form__submit"
        />
      </form>
    </>
  );
};

export default ClientNew;
