import { ToastContainer, Bounce, ToastContainerProps } from "react-toastify";
// import { ToastContainer, Bounce, ToastContainerProps } from "react-toastify";

const Toasts = () => {
  const toastConfig: ToastContainerProps = {
    position: "bottom-right",
    autoClose: 3000,
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
