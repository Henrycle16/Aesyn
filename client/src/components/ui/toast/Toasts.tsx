import { ToastContainer, Bounce, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toasts = () => {
  const toastConfig: ToastContainerProps = {
    position: "top-right",
    autoClose: false,
    newestOnTop: true,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    draggable: true,
    theme: "colored",
    transition: Bounce,
  };

  return (
    <>
      <ToastContainer containerId="success" {...toastConfig} />
      <ToastContainer containerId="discarded" {...toastConfig} />
      <ToastContainer containerId="deleted" {...toastConfig} />
      <ToastContainer containerId="warning" {...toastConfig} />
    </>
  );
};

export default Toasts;
