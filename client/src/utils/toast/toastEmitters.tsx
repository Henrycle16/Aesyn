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
    className: "border border-[#1d8133]",
  });
};

export const showDiscardedToast = () => {
  const msgProps = {
    title: "Changes Discarded",
    text: "Your changes have been discarded.",
  };
  return toast.info(<Msg {...msgProps} />, {
    className: "border border-[#184465]",
  });
};

export const showDeletedToast = () => {
  const msgProps = {
    title: "Package Deleted",
    text: "Your package has been deleted.",
  };
  return toast.error(<Msg {...msgProps} />, {
    className: "border border-[#B21717]",
  });
};

export const showWarningToast = () => {
  const msgProps = {
    title: "Warning",
    text: "Warning message here.",
  };
  return toast.warn(<Msg {...msgProps} />, {
    className: "border border-[#E1651F]",
  });
};
