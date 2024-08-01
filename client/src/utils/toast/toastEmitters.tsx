import { toast } from "react-toastify";

type MsgProps = {
  title: string;
  text: string;
};

const Msg = ({ title, text }: MsgProps) => {
  return (
    <div className="msg-container">
      <p className="msg-title">{title}</p>
      <p className="msg-description">{text}</p>
    </div>
  );
};

export const showSuccessToast = () => {
  const msgProps = {
    title: "Changes Saved",
    text: "Your changes have been successfully saved.",
  };
  return toast.success(<Msg {...msgProps} />, {
    containerId: "success",
  });
};

export const showDiscardedToast = () => {
  const msgProps = {
    title: "Changes Discarded",
    text: "Your changes have been discarded.",
  };
  return toast.info(<Msg {...msgProps} />, {
    containerId: "discarded",
  });
};

export const showDeletedToast = () => {
  const msgProps = {
    title: "Package Deleted",
    text: "Your package has been deleted.",
  };
  return toast.error(<Msg {...msgProps} />, {
    containerId: "deleted",
  });
};

export const showWarningToast = () => {
  const msgProps = {
    title: "Warning",
    text: "Warning message here.",
  };
  return toast.warn(<Msg {...msgProps} />, {
    containerId: "warning",
  });
};
