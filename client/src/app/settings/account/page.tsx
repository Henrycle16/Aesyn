import PersonalInformation from "./_components/PersonalInfo";
import Password from "./_components/Password";
import AccountManagement from "./_components/AccountManagement";

export default function AccountPage() {
  return (
    <>
      <h1 className="heading1 ts5-text">My Account</h1>
      {/* Personal Information Section */}
      <PersonalInformation />
      {/* Password Section */}
      <Password />
      {/* Account Management Section */}
      <AccountManagement />
    </>
  );
}
