type Props = {
  id: number;
}

const DeletePackage = (props: Props) => {
  return (
    <dialog id={`delete_package_modal_${props.id}`} className="modal">
      <div className="modal-box bg-white text-[#4A4A4A] min-w-[38rem] pt-8 pl-8 pr-6 pb-6">
        {/* Header Text */}
        <div className="">
          <h1 className="text-[#184465] font-semibold text-2xl">
            Delete Package?
          </h1>
          <p className="pb-4 pt-2 text-sm">
            You are about to delete this package. Are you sure you want to continue?
          </p>
        </div>
        <form method="dialog">
          {/* Action Buttons -- if there is a button in form, it will close the modal */}
          <div className="flex justify-end mt-14 gap-2">
            <button
              onClick={() => {
                (document.getElementById(`edit_package_modal_${props.id}`) as HTMLDialogElement).showModal();
                console.log("Cancel Delete Package");
              }}
              // type="button"
              className="border-2 border-[#3798E3] text-[#3798E3] py-3 px-6 capitalize font-bold rounded-md hover:bg-[#F5F5F5]"
            >
              Cancel
            </button>
            <button
              onClick={() => console.log("Delete Package")}
              // type="submit"
              className="bg-[#B21717] text-white py-3 px-6 capitalize font-bold rounded-md hover:bg-[#b21717c9]"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}

export default DeletePackage