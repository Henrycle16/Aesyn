import Button from "@mui/material/Button";

export default function AccountManagement() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="border border-gray-300 rounded-badge min-h-[16rem] grid grid-rows-[12.75rem,1fr]">
      <div className="p-8">
        <h2 className="subheader2 ts5-text pb-4"> Account Management </h2>
        <h2 className="body2 ts5-text"> Deactivate Account </h2>
        <p className="mt-1 text-sm min-h-1 ts8-text">{}</p>
        <div className="flex flex-row items-center justify-between">
          <p className="body1">
            {" "}
            This will temporarily deactive your account. Brands will not see
            your profile. Your account will reactivate when you sign in again.{" "}
          </p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="secondary-btn mt-3 mb-2 button"
          >
            Deactivate
          </Button>
        </div>
        <h2 className="body2 ts5-text"> Delete Account </h2>
        <p className="mt-1 text-sm min-h-1 ts8-text">{}</p>
        <div className="flex flex-row items-center justify-between">
          <p className="body1">
            {" "}
            This will permanently delete your account from ShareFluence.{" "}
          </p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="delete-btn mt-3 mb-2 button"
          >
            Delete
          </Button>
        </div>
      </div>
    </section>
  );
}
