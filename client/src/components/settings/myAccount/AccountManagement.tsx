import Button from "@mui/material/Button";

export default function AccountManagement() {
  
  return (
    <section className="border border-gray-300 rounded-badge min-h-[14rem] grid">
      <div className="p-6">
        <h2 className="subheader2 ts5-text pb-4"> Account Management </h2>
        <h2 className="body2 ts5-text"> Deactivate Account </h2>
        <p className="mt-1 text-sm min-h-1 ts8-text">{}</p>
        <div className="flex flex-row items-center justify-between mb-8">
          <p className="body1 mr-24">
            {" "}
            This will temporarily deactive your account. Brands will not see
            your profile. Your account will reactivate when you sign in again.{" "}
          </p>
          <div className="self-end">
            <Button
            type="submit"
            fullWidth
            variant="contained"
            className="secondary-btn button px-6"
          >
            Deactivate
          </Button></div>
          
        </div>
        <h2 className="body2 ts5-text"> Delete Account </h2>
        <p className="mt-1 text-sm min-h-1 ts8-text">{}</p>
        <div className="flex flex-row items-center justify-between">
          <p className="body1">
            {" "}
            This will permanently delete your account from ShareFluence.{" "}
          </p>
          <div className="self-end">
            <Button
            type="submit"
            fullWidth
            variant="contained"
            className="delete-btn px-5 py-2 button"
          >
            Delete
          </Button></div>
        </div>
      </div>
    </section>
  );
}
