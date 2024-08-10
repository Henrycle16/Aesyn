import { toast } from "react-toastify";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

type MsgProps = {
  title: string;
  text: string;
};

const Msg = ({ title, text }: MsgProps) => {
  return (
    <div className="ml-4">
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
    icon: <CheckCircleOutlinedIcon fontSize="large"/>,
  });
};

export const showDiscardedToast = () => {
  const msgProps = {
    title: "Changes Discarded",
    text: "Your changes have been discarded.",
  };
  return toast.info(<Msg {...msgProps} />, {
    toastId: "info-toast",
    icon: <InfoOutlinedIcon fontSize="large"/>,
  });
};

export const showDeletedToast = (title: string, text: string) => {
  const msgProps = {
    title: title,
    text: text,
  };
  return toast.error(<Msg {...msgProps} />, {
    toastId: "delete-toast",
    icon: <ErrorOutlineOutlinedIcon fontSize="large"/>,
  });
};

export const showWarningToast = () => {
  const msgProps = {
    title: "Warning",
    text: "Warning message here.",
  };
  return toast.warn(<Msg {...msgProps} />, {
    toastId: "warn-toast",
    icon: <WarningAmberOutlinedIcon fontSize="large" sx={{color: "#E1651F"}}/>,
  });
};
