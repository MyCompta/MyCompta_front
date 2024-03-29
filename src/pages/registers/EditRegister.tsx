import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import fetcher from "../../utils/fetcher";

export default function EditRegister() {
  const location = useLocation();
  const state = location.state;
  let registerState;
  if (state && state.registerState) {
    registerState = state.registerState;
  }
  const { id } = useParams();
  const [register, setRegister] = useState(registerState);

  useEffect(() => {
    const fetchRegister = async () => {
      fetcher(`registers/${id}`, undefined, "GET", true)
        .then((res) => setRegister(res))
        .catch((err) => console.error(err));
    };
    if (!register) {
      fetchRegister();
    }
  }, [id, register]);

  return <>{register ? register.title : "Register not found"}</>;
}
