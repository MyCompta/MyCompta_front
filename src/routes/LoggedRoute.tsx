import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import fetcher from "../utils/fetcher";
import { useSetAtom } from "jotai";
import societyAtom from "../atom/societyAtom";

export default function LoggedRoute({ redirectPath = "/login" }: { redirectPath: string }) {
  const [isCheckingSociety, setIsCheckingSociety] = useState(true);
  const [shouldRedirectToCreate, setShouldRedirectToCreate] = useState(false);
  const token = Cookies.get("token");
  const currentSociety = Cookies.get("currentSociety");
  const location = useLocation();
  const setSociety = useSetAtom(societyAtom);

  useEffect(() => {
    const checkSociety = async () => {
      return await fetcher("societies", undefined, "GET", true)
        .then((res: TSocietyBack[]) => {
          if (!res.length) return false;
          Cookies.set("currentSociety", String(res[0].id));
          setSociety(
            (prevSociety) =>
              ({
                ...prevSociety,
                id: res[0].id,
                name: res[0].name,
                address: res[0].address,
                zip: res[0].zip,
                city: res[0].city,
                country: res[0].country,
                siret: res[0].siret,
                status: res[0].status,
                capital: res[0].capital,
                email: res[0].email,
              }) as TSocietyBack
          );
          return true;
        })
        .catch(() => false);
    };

    const checkAndNavigate = async () => {
      try {
        const result = await checkSociety();
        if (!result) {
          setShouldRedirectToCreate(true); // If promise resolves to false, prepare to navigate
        }
      } catch (error) {
        // Handle any errors that might occur during the check
      } finally {
        setIsCheckingSociety(false); // Promise has resolved, we can stop showing the loading state
      }
    };

    checkAndNavigate();
  }, [setSociety]);

  if (isCheckingSociety) return <div>Loading...</div>;
  if (
    !currentSociety &&
    !parseInt(currentSociety!) &&
    shouldRedirectToCreate &&
    location.pathname !== "/societies/create"
  )
    return <Navigate to="/societies/create" />;
  if (!token || !JSON.parse(token).token) return <Navigate to={redirectPath} />;

  return <Outlet />;
}
