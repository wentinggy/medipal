import { useEffect, useState } from "react";
import { apiClient } from "services/api";
import { useToastr } from "./useToastr";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface UseInactivityProps {
  timeout?: number;
}

function useInactivity({ timeout = 5 * 60 * 1000 }: UseInactivityProps = {}) {
  const [isActive, setIsActive] = useState(true);
  const { showToastr } = useToastr();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const sessionId: string = Cookies.get("sessionid") ?? "";
    await apiClient.logout(sessionId).finally(() => {
      Cookies.remove("email");
      Cookies.remove("name");
      navigate("/");
    });
  };

  useEffect(() => {
    let inactivityTimeout: NodeJS.Timeout;

    function resetInactivityTimer() {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        setIsActive(false);
        showToastr({
          message: "Session expired, please login again!",
          type: "error",
        });
        handleLogout();
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
  }, [isActive, timeout, showToastr]);

  return isActive;
}

export default useInactivity;
