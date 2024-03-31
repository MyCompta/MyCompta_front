import { useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import fetcher from "../../utils/fetcher";
import Cookies from "js-cookie";
import { useSetAtom, useAtomValue, useAtom } from "jotai";
import { editRegisterModalStatusAtom } from "../../atom/modalAtom";
import { registerAtom } from "../../atom/registerAtom";
import { registersAtom } from "../../atom/registerAtom";
import { currentSocietyAtom } from "../../atom/societyAtom";
import { successAtom } from "../../atom/notificationAtom";

export type FormValues = {
  title: string;
  payment_method: string;
  amount: number;
  comment: string;
  paid_at: string;
  is_income: boolean;
};

const RegisterEdit = () => {
  const setEditRegisterModalStatus = useSetAtom(editRegisterModalStatusAtom);
  const currentSociety = useAtomValue(currentSocietyAtom);
  const registerData = useAtomValue(registerAtom);
  const [registers, setRegisters] = useAtom(registersAtom);
  const setSuccess = useSetAtom(successAtom);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();
  const isIncome = useWatch({
    control,
    name: "is_income",
    defaultValue: false,
  });

  useEffect(() => {
    setValue("title", registerData!.title);
    setValue("payment_method", registerData!.payment_method);
    setValue("amount", registerData!.amount);
    setValue("comment", registerData!.comment!);
    setValue(
      "paid_at",
      new Date(registerData!.paid_at).toISOString().split("T")[0]
    );
    setValue("is_income", registerData!.is_income);
  }, [setValue, registerData]);

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
    formData.append("register[is_income]", data.is_income.toString());

    try {
      const response = await fetcher(
        `/registers/${registerData!.id}`,
        formData,
        "PUT",
        true
      );
      if (!response.error) {
        const indexToUpdate = registers.findIndex(
          (register) => register.id === registerData!.id
        );
        if (indexToUpdate !== -1) {
          const updatedRegisters = [...registers];
          updatedRegisters[indexToUpdate] = response;
          setRegisters(updatedRegisters);

          console.log("Register updated successfully");
          setSuccess("Register updated successfully");
          setEditRegisterModalStatus(false);
        }
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données :", error);
    }
  };

  if (!registerData) return <p>Loading...</p>;

  return (
    <>
      <div className="modal-register-header">
        <h1>Edit register</h1>
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
                    checked={field.value}
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
          value="Save changes"
          className="btn register-form__submit"
        />
      </form>
    </>
  );
};

export default RegisterEdit;
