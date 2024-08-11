"use client";

interface LayoutProps {
 children: React.ReactNode;
}

const Modal = ({children}: LayoutProps) => {

 
  return (
    <dialog id="modal" className="modal">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex flex-col items-center">{children}</div>
      </div>
    </dialog>
  );
};

export default Modal;
