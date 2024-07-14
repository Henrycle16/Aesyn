import { deleteContent, resetCurrentContent } from "@/redux/slices/creatorPortfolio-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

const DeletePortfolioContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentContent = useAppSelector(
    (state) => state.creatorContentReducer.value.currentContent?.contentId
  );

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentContent !== undefined){
      dispatch(deleteContent(currentContent));
      dispatch(resetCurrentContent());
    }
    (document.getElementById(`delete_content_modal`) as HTMLDialogElement).close();
  };

  return (
    <dialog id="delete_content_modal" className="modal">
      <div className="modal-box bg-white text-[#4A4A4A] min-w-[38rem] pt-8 pl-8 pr-6 pb-6">
        {/* Header Text */}
        <div className="">
          <h1 className="text-[#184465] font-semibold text-2xl">
            Delete Content?
          </h1>
          <p className="pb-4 pt-2 text-sm">
            You are about to delete a content from your portfolio. Are you sure you want to
            continue?
          </p>
        </div>
        <form method="dialog" onSubmit={onFormSubmit}>
          {/* Action Buttons -- if there is a button in form, it will close the modal */}
          <div className="flex justify-end mt-14 gap-2">
            <button
              onClick={() => {
                dispatch(resetCurrentContent()),
                (document.getElementById("delete_content_modal") as HTMLDialogElement).close();
              }}
              type="button"
              className="border-2 border-[#3798E3] text-[#3798E3] py-3 px-6 capitalize font-bold rounded-md hover:bg-[#F5F5F5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#B21717] text-white py-3 px-6 capitalize font-bold rounded-md hover:bg-[#b21717c9]"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default DeletePortfolioContent;
