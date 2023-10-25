import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useToastr = () => {
  const showToastr = (message, type = "info", autoClose = true) => {
    const toastId = toast[type](message, {
      autoClose: autoClose, // Defaults to automatic close
      closeButton: true, // Show a close button
    });

    // Return the ID of the toast so it can be closed later
    return toastId;
  };

  const closeToastr = (toastId) => {
    toast.dismiss(toastId); // Close the toast by its ID
  };

  return { showToastr, closeToastr };
};
