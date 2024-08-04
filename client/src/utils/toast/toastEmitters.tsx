import { toast } from "react-toastify";

type MsgProps = {
  title: string;
  text: string;
};

const Msg = ({ title, text }: MsgProps) => {
  return (
    <div className="">
      <p className="font-bold">{title}</p>
      <p className="text-sm g5-text">{text}</p>
    </div>
  );
};

export const showSuccessToast = () => {
  const msgProps = {
    title: "Changes Saved",
    text: "Your changes have been successfully saved.",
  };
  return toast.success(<Msg {...msgProps} />, {
    toastId: "success-toast",
  });
};

export const showDiscardedToast = () => {
  const msgProps = {
    title: "Changes Discarded",
    text: "Your changes have been discarded.",
  };
  return toast.info(<Msg {...msgProps} />, {
    toastId: "info-toast",
  });
};

export const showDeletedToast = (title: string, text: string) => {
  const msgProps = {
    title: title,
    text: text,
  };
  return toast.error(<Msg {...msgProps} />, {
    toastId: "delete-toast",
  });
};

export const showWarningToast = () => {
  const msgProps = {
    title: "Warning",
    text: "Warning message here.",
  };
  return toast.warn(<Msg {...msgProps} />, {
    toastId: "warn-toast",
  });
};
