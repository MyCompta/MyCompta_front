import { useEffect } from "react";
import { useForm } from "react-hook-form";
import fetcher from "../../utils/fetcher";
import Cookies from "js-cookie";
import { useSetAtom } from "jotai";
import { editClientModalStatusAtom } from "../../atom/modalAtom";
import { Dispatch, SetStateAction } from "react";
import { successAtom } from "../../atom/notificationAtom";

const ClientEdit = ({
  clientData,
  setClientData,
}: {
  clientData: TClientBack;
  setClientData: Dispatch<SetStateAction<TClientBack | undefined>>;
}) => {
  const setEditClientModalStatus = useSetAtom(editClientModalStatusAtom);
  const setSuccess = useSetAtom(successAtom);
  const {
    register,
    handleSubmit,
    // formState: { errors },
    setValue,
  } = useForm<FormValues>();

  useEffect(() => {
    setValue("business_name", clientData.business_name!);
    setValue("first_name", clientData.first_name!);
    setValue("last_name", clientData.last_name!);
    setValue("siret", clientData.siret!.toString());
    setValue("address", clientData.address);
    setValue("zip", clientData.zip);
    setValue("city", clientData.city);
  }, [setValue, clientData]);

  type FormValues = {
    business_name: string;
    first_name: string;
    last_name: string;
    siret: string;
    address: string;
    zip: number;
    city: string;
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    formData.append("client[user_id]", JSON.parse(Cookies.get("token")!).user_id);
    formData.append("client[society_id]", String(1)); // !! TO CHANGE !!
    formData.append("client[business_name]", data.business_name!);
    formData.append("client[first_name]", data.first_name!);
    formData.append("client[last_name]", data.last_name!);
    formData.append("client[siret]", data.siret!);
    formData.append("client[address]", data.address);
    formData.append("client[zip]", String(data.zip));
    formData.append("client[city]", data.city);
    formData.append("client[is_pro]", String(data.siret ? true : false));

    try {
      const response = await fetcher(`/clients/${clientData.id}`, formData, "PUT", true);
      if (!response.error) {
        setClientData(response);
        console.log("Client updated successfully");
        setSuccess("Client updated successfully");
        setEditClientModalStatus(false);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données :", error);
    }
  };

  if (!clientData) return <p>Loading...</p>;

  return (
    <>
      <div className="modal-client-header">
        <h1>Edit client</h1>
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
              {...register("business_name")}
              placeholder="Business name here"
              autoComplete="current-business-name"
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
          </div>
        </div>

        <input type="submit" value="Save changes" className="btn client-form__submit" />
      </form>
    </>
  );
};

export default ClientEdit;
