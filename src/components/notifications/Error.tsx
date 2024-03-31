import { useAtom } from "jotai";
import { errorAtom } from "../../atom/notificationAtom";
import { useEffect, useState } from "react";
import "./Error.scss";

export default function Error() {
  const [error, setError] = useAtom(errorAtom);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (animated) return;
    if (error) {
      setAnimated(true);
      document.getElementById("errorModal")!.classList.add("fadeIn");
      setTimeout(() => {
        setTimeout(() => {
          document.getElementById("errorModal")!.classList.add("fadeOut");

          setTimeout(() => {
            setError("");
            setAnimated(false);
          }, 1000);
        }, 5000);
      }, 1000);
    }
  }, [error, animated, setError]);

  return error && <div id="errorModal">{error}</div>;
}
