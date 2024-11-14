import Modal from "@/app/settings/account/_components/Modal"
import DeletePopup from "./DeletePopup";

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
            <button
            type="submit"
            className="secondary-btn button"
          >
            Deactivate
          </button></div>
          
        </div>
        <h2 className="body2 ts5-text"> Delete Account </h2>
        <p className="mt-1 text-sm min-h-1 ts8-text">{}</p>
        <div className="flex flex-row items-center justify-between">
          <p className="body1">
            {" "}
            This will permanently delete your account from Aesyn.{" "}
          </p>
          <div className="self-end">
            <button
            type="submit"
            className="delete-btn button"
            onClick={() =>
              (
                document.getElementById("modal") as HTMLDialogElement
              ).showModal()
            }
          >
            Delete
          </button></div>
        </div>
      </div>
      <Modal>
        <DeletePopup />
      </Modal>
    </section>
  );
}
