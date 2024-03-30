import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import societyAtom, { currentSocietyAtom } from "../../atom/societyAtom";
import fetcher from "../../utils/fetcher";
import "./IndexRegister.scss";
import { Link, useNavigate } from "react-router-dom";

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
  for (
    let i = now.getFullYear();
    i > new Date(currentSociety.created_at).getFullYear();
    i--
  ) {
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
          }}
        >
          Add a register
        </Link>
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

      <table className="invoice-table">
        <thead>
          <tr>
            <th>TITLE</th>
            <th>DATE</th>
            <th>AMOUNT</th>
            <th>PAYMENT_METHOD</th>
            <th>COMMENT</th>
          </tr>
        </thead>
        <tbody>
          {registers && registers.length ? (
            registers.map((register) => (
              <tr
                key={register.id}
                onClick={() =>
                  navigate(`/registers/${register.id}`, {
                    state: { registerState: register },
                  })
                }
              >
                <td>{register.title}</td>
                <td>{new Date(register.paid_at).toLocaleDateString()}</td>
                <td>{register.amount.toFixed(2)}</td>
                <td>{register.payment_method}</td>
                <td>{register.comment}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="invoice-table__no-invoices">
                No registers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
