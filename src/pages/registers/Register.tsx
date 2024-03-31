import { useNavigate } from "react-router-dom";
import fetcher from "../../utils/fetcher";
import { useSetAtom } from "jotai";
import { registersAtom } from "../../atom/registerAtom";
import { errorAtom } from "../../atom/notificationAtom";
import { editRegisterModalStatusAtom } from "../../atom/modalAtom";
import { registerAtom } from "../../atom/registerAtom";

import { IoDocumentText } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const Register = ({ register }: { register: TRegisterBack }) => {
  const navigate = useNavigate();
  const setEditRegisterModalStatus = useSetAtom(editRegisterModalStatusAtom);
  const setRegisters = useSetAtom(registersAtom);
  const setRegister = useSetAtom(registerAtom);
  const setError = useSetAtom(errorAtom);

  const handleShowRegister = (register: TRegisterBack) => {
    navigate(`/registers/${register.id}`);
  };

  const handleEditRegister = (register: TRegisterBack) => {
    console.log("register", register);
    setRegister(register);
    setEditRegisterModalStatus(true);
  };

  const handleDeleteRegister = async (registerId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this register? All associated information with this register will be erased."
    );

    if (!confirmed) return;

    const response = await fetcher(
      `registers/${registerId}`,
      undefined,
      "DELETE",
      true
    );
    if (!response.error) {
      setRegisters((registers) => registers.filter((r) => r.id !== registerId));
      console.log("Register deleted successfully");
      setError("Register deleted successfully");
    } else {
      console.error(response.error);
    }
  };

  return (
    <tr
      className={register.is_income ? "green-bg" : "red-bg"}
      key={register.id}
    >
      <td>{register.title}</td>
      <td>{new Date(register.paid_at).toLocaleDateString()}</td>
      <td className={register.is_income ? "green" : "red"}>
        {register.is_income ? "+" : "-"}
      </td>
      <td>
        {register.amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{" "}
        €
      </td>
      <td>{register.payment_method}</td>
      <td>{register.comment}</td>
      <td>
        <div className="register-item-options">
          <IoDocumentText
            className="btn btn--no-bg btn--xxs"
            title="Details"
            onClick={() => handleShowRegister(register)}
          />
          <MdEditDocument
            className="btn btn--no-bg btn--xxs"
            title="Edit"
            onClick={() => handleEditRegister(register)}
          />
          <FaTrash
            className="register-item-options__trash btn btn--alert btn--xxs"
            title="Delete"
            onClick={() => handleDeleteRegister(register.id)}
          />
        </div>
      </td>
    </tr>
  );
};

export default Register;
