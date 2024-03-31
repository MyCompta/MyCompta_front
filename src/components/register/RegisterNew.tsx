import { useForm, Controller, useWatch } from "react-hook-form";
import fetcher from "../../utils/fetcher";
import Cookies from "js-cookie";
import { useSetAtom, useAtomValue } from "jotai";
import { newRegisterModalStatusAtom } from "../../atom/modalAtom";
import { currentSocietyAtom } from "../../atom/societyAtom";
import { registersAtom } from "../../atom/registerAtom";
import { successAtom } from "../../atom/notificationAtom";

export type FormValues = {
  title: string;
  payment_method: string;
  amount: number;
  comment: string;
  paid_at: string;
  is_income: boolean;
};

const RegisterNew = () => {
  const setNewRegisterModalStatus = useSetAtom(newRegisterModalStatusAtom);
  const setRegistersData = useSetAtom(registersAtom);
  const setSuccess = useSetAtom(successAtom);
  const currentSociety = useAtomValue(currentSocietyAtom);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const isIncome = useWatch({
    control,
    name: "is_income",
    defaultValue: false,
  });

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append(
      "register[user_id]",
      JSON.parse(Cookies.get("token")!).user_id
    );
    formData.append("register[society_id]", currentSociety);
    formData.append("register[title]", data.title);
    formData.append("register[payment_method]", data.payment_method);
    formData.append("register[amount]", data.amount.toString());
    formData.append("register[comment]", data.comment);
    formData.append("register[paid_at]", data.paid_at);
    formData.append("register[is_income]", String(data.is_income));

    try {
      const response = await fetcher("registers", formData, "POST", true);
      if (!response.error) {
        console.log("response : ", response);
        setRegistersData((prevRegisters) => [...prevRegisters, response]);
        console.log("Register created successfully");
        setSuccess("Register created successfully");
        setNewRegisterModalStatus(false);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  return (
    <>
      <div className="modal-register-header">
        <h1>New register</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="register-form-container"
      >
        <p className="register-form__info">
          <span>* </span>indicates a required field
        </p>
        <div className="register-form">
          <label htmlFor="title">
            Title<span> *</span>
          </label>
          <input
            type="text"
            {...register("title", {
              required: true,
            })}
            placeholder="Title here"
            autoComplete="current-title"
          />
          {errors.title && errors.title.type === "required" && (
            <p>Title can not be empty</p>
          )}

          <label htmlFor="payment_method">
            Payment method<span> *</span>
          </label>
          <Controller
            name="payment_method"
            control={control}
            defaultValue={""} // Assurez-vous de définir une valeur par défaut si nécessaire
            rules={{ required: true }}
            render={({ field }) => (
              <select {...field}>
                <option value="" disabled>
                  Select payment type
                </option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="cheque">Cheque</option>
                <option value="transfer">Transfer</option>
                <option value="other">Other</option>
              </select>
            )}
          />
          {errors.payment_method && <p>Please select a payment method</p>}

          <div className="register-form__amount-box">
            <label htmlFor="amount">
              Amount<span> *</span>
            </label>
            <div className="register-form__amount-box-sign">
              <p className={isIncome ? "green" : "red"}>
                {isIncome ? "+" : "-"}
              </p>
              <input
                type="number"
                step="0.01"
                {...register("amount", {
                  required: true,
                })}
                placeholder="Amount here"
                autoComplete="current-amount"
              />
            </div>
            {errors.amount && errors.amount.type === "required" && (
              <p>Amount can not be empty</p>
            )}

            <Controller
              name="is_income"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <div className="register-form__checkbox">
                  <label htmlFor="is_income">Is income?</label>
                  <input
                    type="checkbox"
                    onChange={(e) => field.onChange(e.target.checked)}
                    id="is_income" // Identifiant de l'input pour lier l'étiquette
                  />
                </div>
              )}
            />
          </div>

          <label htmlFor="paid_at">
            Paid at<span> *</span>
          </label>
          <input
            type="date"
            {...register("paid_at", {
              required: true,
            })}
          />
          {errors.paid_at && errors.paid_at.type === "required" && (
            <p>Date of payment is required</p>
          )}

          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            {...register("comment")}
            placeholder="Comment here"
            autoComplete="current-comment"
          />
        </div>

        <input
          type="submit"
          value="Create"
          className="btn register-form__submit"
        />
      </form>
    </>
  );
};

export default RegisterNew;
