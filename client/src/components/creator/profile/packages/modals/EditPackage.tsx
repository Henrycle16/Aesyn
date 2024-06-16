"use client";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type Props = {
  id: number;
  socialMedia: string;
  packageType: string;
  packageDescription: string;
  price: number;
  quantity: number;
};

const EditPackage = (props: Props) => {
  return (
    <dialog id={`edit_package_modal_${props.id}`} className="modal">
      <div className="modal-box bg-white text-[#061119] min-w-[60rem] pt-10 pl-14 pr-10 pb-8">
        {/* Header Text */}
        <div className="">
          <div className="flex gap-3 items-center">
            <h1 className="text-[#184465] font-semibold text-2xl">
              Edit Package
            </h1>
            <DeleteOutlineIcon
              sx={{ color: "#FF0000" }}
              className="cursor-pointer"
              onClick={() => {
                (document.getElementById(`edit_package_modal_${props.id}`) as HTMLDialogElement).close();
                (document.getElementById(`delete_package_modal_${props.id}`) as HTMLDialogElement).showModal();
                console.log("Open Delete Package Modal");
              }}
            />
          </div>
          <p className="pb-4 pt-2 text-sm">
            Edit your content package plan to list on your profile for brands to
            purchase.
          </p>
        </div>
        <form method="dialog">
          {/* Input Fields Container */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-7">
            {/* Social Media Select */}
            <div>
              <label htmlFor="social_media" className="text-[#4A4A4A] block font-bold">
                *Social Media
              </label>
              <select
                id={`social_media_${props.id}`}
                name="social_media"
                // ! Should not used defaultValue, use value instead with onChange. (Only for static data, defaultValue is used.)
                defaultValue={props.socialMedia}
                className="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:border-[#3798E3] sm:text-sm"
              >
                <option value="">[Select]</option>
                <option value="Instagram">Instagram</option>
                <option value="Twitter">Twitter</option>
                <option value="Facebook">Facebook</option>
              </select>
            </div>
            {/* Social Media Select */}
            <div>
              <label htmlFor="package_type" className="text-[#4A4A4A] block font-bold">
                *Package Type
              </label>
              <select
                id={`package_type_${props.id}`}
                name="package_type"
                // ! Should not used defaultValue, use value instead with onChange. (Only for static data, defaultValue is used.)
                defaultValue={props.packageType}
                className="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:border-[#3798E3] sm:text-sm"
              >
                <option>[Select]</option>
                <option value="Reel Post">Reel Post</option>
                <option value="Photo Post">Photo Post</option>
                <option value="Multi-Photo Post">Multi-Photo Post</option>
              </select>
            </div>
            {/* Description */}
            <div className="">
              <label htmlFor="description" className="text-[#4A4A4A] block font-bold">
                Description
              </label>
              <textarea
                id={`description_${props.id}`}
                name="description"
                placeholder="Enter package description here..."
                maxLength={100}
                rows={4}
                // ! Should not used defaultValue, use value instead with onChange. (Only for static data, defaultValue is used.)
                defaultValue={props.packageDescription}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-[#3798E3] sm:text-sm"
              ></textarea>
            </div>
            {/* Qty and Price Container */}
            <div className="flex gap-12">
              {/* Quantiy */}
              <div className="flex-1">
                <label htmlFor="qty" className="text-[#4A4A4A] block font-bold">
                  *Quantity
                </label>
                <input
                  type="text"
                  id={`qty_${props.id}`}
                  name="qty"
                  placeholder="#"
                  // ! Should not used defaultValue, use value instead with onChange. (Only for static data, defaultValue is used.)
                  defaultValue={props.quantity}
                  className="w-full mt-1 block py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-[#3798E3] sm:text-sm"
                />
              </div>
              {/* Price */}
              <div className="flex-1">
                <label htmlFor="price" className="text-[#4A4A4A] block font-bold">
                  *Price (USD)
                </label>
                <input
                  type="number"
                  id={`price_${props.id}`}
                  name="price"
                  // ! Should not used defaultValue, use value instead with onChange. (Only for static data, defaultValue is used.)
                  defaultValue={props.price}
                  className="w-full mt-1 block py-3 px-3 pl-6 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-[#3798E3] sm:text-sm"
                />
                <span className="absolute right-auto top-[54%] ml-4 text-sm">$</span>
              </div>
            </div>
          </div>
          {/* Action Buttons -- if there is a button in form, it will close the modal */}
          <div className="flex justify-end mt-14">
            <button
              onClick={() => console.log("Save Package")}
              // type="submit"
              className="bg-[#3798E3] text-white py-3 px-6 capitalize font-bold rounded-md hover:bg-[#2C7AB6]"
            >
              Save
            </button>
          </div>
          <button className="btn btn-lg btn-circle btn-ghost outline-none absolute right-4 top-2 text-lg">
            ✕
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default EditPackage;
