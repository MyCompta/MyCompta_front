import { useEffect, useState } from "react";
import { useSetAtom, useAtomValue, useAtom } from "jotai";
import societyAtom, { currentSocietyAtom } from "../../atom/societyAtom";
import { newRegisterModalStatusAtom } from "../../atom/modalAtom";
import { registersAtom } from "../../atom/registerAtom";
import fetcher from "../../utils/fetcher";
import Register from "./Register";
import "./IndexRegister.scss";

export default function IndexRegister() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const currentSocietyId = useAtomValue(currentSocietyAtom);
  const currentSociety = useAtomValue(societyAtom);
  const setNewRegisterModalStatus = useSetAtom(newRegisterModalStatusAtom);
  const [registers, setRegisters] = useAtom(registersAtom);

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
  for (
    let i = now.getFullYear();
    i > new Date(currentSociety.created_at).getFullYear();
    i--
  ) {
    years.push(i - 1);
  }

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
  }, [currentMonth, currentYear, currentSocietyId, setRegisters]);

  const handleOpenModalNewRegister = () => {
    setNewRegisterModalStatus(true);
  };

  return (
    <div className="index-register">
      <div className="index-register-header">
        <h1>Your registers</h1>
        <button
          onClick={() => handleOpenModalNewRegister()}
          className="btn index-register-header__add-register-btn"
          style={{
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "1rem",
          }}
        >
          Add a register
        </button>
      </div>

      <div className="index-register-date-picker">
        <div className="index-register-date-picker__year">
          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
          >
            <option value={now.getFullYear()}>{now.getFullYear()}</option>
            {years.length &&
              years.map((year) => <option value={year}>{year}</option>)}
          </select>
        </div>
        <div className="index-register-date-picker__months">
          {months.map((month, i) => {
            return (
              <span
                key={i}
                onClick={() => setCurrentMonth(i + 1)}
                className={currentMonth === i + 1 ? "selected" : ""}
              >
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
              <Register key={register.id} register={register} />
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
