import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import societyAtom, { currentSocietyAtom } from "../../atom/societyAtom";
import fetcher from "../../utils/fetcher";
import "./IndexRegister.scss";
import { Link, useNavigate } from "react-router-dom";

import { IoDocumentText } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export default function IndexRegister() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const currentSocietyId = useAtomValue(currentSocietyAtom);
  const currentSociety = useAtomValue(societyAtom);
  const navigate = useNavigate();

  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  const years = [];
  for (let i = now.getFullYear(); i > new Date(currentSociety.created_at).getFullYear(); i--) {
    years.push(i - 1);
  }

  const [registers, setRegisters] = useState<TRegisterBack[]>();
  useEffect(() => {
    const fetchRegisters = async () => {
      fetcher(
        `registers?month=${currentMonth}&year=${currentYear}` +
          (currentSocietyId ? `&society_id=${currentSocietyId}` : ""),
        undefined,
        "GET",
        true
      )
        .then((res: TRegisterBack[]) => setRegisters(res))
        .catch((err) => console.error(err));
    };

    fetchRegisters();
  }, [currentMonth, currentYear, currentSocietyId]);

  // const handleShowRegister = (id: number) => {
  //   navigate(`/registers/${id}`);
  // };

  // const handleEditRegister = (id: number) => {
  //   navigate(`/registers/edit/${id}`);
  // };

  const handleDeleteRegister = (e: React.MouseEvent<SVGElement>, id: number) => {
    e.preventDefault();
    fetcher(`registers/${id}`, undefined, "DELETE", true)
      .then(() => {
        setRegisters(registers?.filter((r) => r.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="index-register">
      <div className="index-register-header">
        <h1>Your registers</h1>
        <Link
          to="/registers/create"
          className="btn"
          style={{
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "1rem",
          }}>
          Add a register
        </Link>
      </div>

      <div className="index-register-date-picker">
        <div className="index-register-date-picker__year">
          <select value={currentYear} onChange={(e) => setCurrentYear(parseInt(e.target.value))}>
            <option value={now.getFullYear()}>{now.getFullYear()}</option>
            {years.length && years.map((year) => <option value={year}>{year}</option>)}
          </select>
        </div>
        <div className="index-register-date-picker__months">
          {months.map((month, i) => {
            return (
              <span
                key={i}
                onClick={() => setCurrentMonth(i + 1)}
                className={currentMonth === i + 1 ? "selected" : ""}>
                {month}
              </span>
            );
          })}
        </div>
      </div>

      <table className="register-table">
        <thead>
          <tr>
            <th>TITLE</th>
            <th>DATE</th>
            <th></th>
            <th>AMOUNT</th>
            <th>PAYMENT METHOD</th>
            <th>COMMENT</th>
          </tr>
        </thead>
        <tbody>
          {registers && registers.length ? (
            registers.map((register) => (
              <tr
                className={register.is_income ? "green-bg" : "red-bg"}
                key={register.id}
                onClick={() =>
                  navigate(`/registers/${register.id}`, {
                    state: { registerState: register },
                  })
                }>
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
                <td>
                  {register.comment}
                  {/* 'register-item-options-ghost' stabilize line on hover. DO NOT REMOVE */}
                  <div className="register-item-options-ghost"></div>{" "}
                  <div className="register-item-options">
                    <IoDocumentText className="btn btn--no-bg btn--xxs" title="Details" />
                    <MdEditDocument className="btn btn--no-bg btn--xxs" title="Edit" />
                    <FaTrash
                      className="register-item-options__trash btn btn--alert btn--xxs"
                      title="Delete"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.confirm("Are you sure you want to delete this register?") &&
                          handleDeleteRegister(e, register.id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="register-table__no-invoices">
                No registers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
