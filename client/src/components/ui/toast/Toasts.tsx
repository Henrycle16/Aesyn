import {
  ToastContainer,
  Bounce,
  ToastContainerProps,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toasts = () => {
  const toastConfig: ToastContainerProps = {
    position: "bottom-right",
    autoClose: false,
    newestOnTop: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    draggable: true,
    theme: "colored",
    transition: Bounce,
  };

  return (
    <>
      <ToastContainer {...toastConfig} />
    </>
  );
};

export default Toasts;
