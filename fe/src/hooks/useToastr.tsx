import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastrOptions {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  autoClose?: boolean | number;
}

export const useToastr = () => {
  const showToastr = ({
    message,
    type = "info",
    autoClose = true,
  }: ToastrOptions) => {
    const toastId = toast[type](message, {
      autoClose: autoClose === true ? undefined : autoClose, // Defaults to automatic close
      closeButton: true, // Show a close button
    } as ToastOptions);

    // Return the ID of the toast so it can be closed later
    return toastId;
  };

  const closeToastr = (toastId: number) => {
    toast.dismiss(toastId); // Close the toast by its ID
  };

  return { showToastr, closeToastr };
};
