import Button from "@mui/material/Button";
import PersonalInfo from "./PersonalInfo";
import PasswordInfo from "./Password";
import AccountManagement from "./AccountManagement";

export default function MyAccount() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <h2 className="subheader1 ts5-text"> My Account </h2>
      <PersonalInfo />
      <PasswordInfo />
      <AccountManagement />
    </>
  );
}
