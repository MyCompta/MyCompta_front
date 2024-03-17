import { useAtom } from "jotai";
import { successAtom } from "../../atom/notificationAtom";
import { useEffect, useState } from "react";
import "./Success.css";

export default function Error() {
  const [success, setSuccess] = useAtom(successAtom);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (animated) return;
    if (success) {
      setAnimated(true);
      document.getElementById("successModal")!.classList.add("fadeIn");
      setTimeout(() => {
        setTimeout(() => {
          document.getElementById("successModal")!.classList.add("fadeOut");

          setTimeout(() => {
            setSuccess("");
            setAnimated(false);
          }, 1000);
        }, 5000);
      }, 1000);
    }
  }, [success, animated, setSuccess]);

  return success && <div id="successModal">{success}</div>;
}
