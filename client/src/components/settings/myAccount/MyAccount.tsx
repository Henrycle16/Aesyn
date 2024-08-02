import Button from "@mui/material/Button";
import PersonalInfo from "../../../app/settings/account/_components/PersonalInfo";
import PasswordInfo from "../../../app/settings/account/_components/Password";
import AccountManagement from "../../../app/settings/account/_components/AccountManagement";

const MyAccount = () => {
  return (
    <>
      <h2 className="subheader1 ts5-text"> My Account </h2>
      <PersonalInfo />
      <PasswordInfo />
      <AccountManagement />
    </>
  );
}

export default MyAccount;