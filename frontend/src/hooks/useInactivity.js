import { useEffect, useState } from "react";
import { logout } from "../api";
import { useToastr } from "../Components/notifications/toastr";

function useInactivity(timeout = 5 * 60 * 1000) {
  const [isActive, setIsActive] = useState(true);
  const { showToastr } = useToastr();

  useEffect(() => {
    let inactivityTimeout;

    function resetInactivityTimer() {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        setIsActive(false);
        showToastr("Session expired, please login again!");
      }, timeout);
    }

    function handleUserActivity() {
      if (!isActive) {
        setIsActive(true);
        resetInactivityTimer();
      }
    }

    resetInactivityTimer();

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    return () => {
      clearTimeout(inactivityTimeout);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, [isActive, timeout]);

  return isActive;
}

export default useInactivity;
