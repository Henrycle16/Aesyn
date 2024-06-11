"use client";

type Props = {};

const AddPackage = (props: Props) => {
  return (
    <dialog id="add_package_modal" className="modal">
      <div className="modal-box bg-white text-[#4A4A4A] min-w-[60rem] pt-10 pl-14 pr-10 pb-8">
        {/* Header Text */}
        <div className="">
          <h1 className="text-[#184465] font-semibold text-2xl">
            Add New Package
          </h1>
          <p className="pb-4 pt-2 text-sm">
            Create your content package plan to list on your profile for brands
            to purchase.
          </p>
        </div>
        {/* Form */}
        <form method="dialog">
          {/* Input Fields Container */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-7">
            {/* Social Media Select */}
            <div>
              <label htmlFor="social_media" className="block font-bold">
                *Social Media
              </label>
              <select
                id="social_media"
                name="social_media"
                className="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-[#3798E3] focus:border-[#3798E3] sm:text-sm"
              >
                <option>[Select]</option>
                <option>Twitter</option>
                <option>Facebook</option>
              </select>
            </div>
            {/* Social Media Select */}
            <div>
              <label htmlFor="package_type" className="block font-bold">
                *Package Type
              </label>
              <select
                id="package_type"
                name="package_type"
                className="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-[#3798E3] focus:border-[#3798E3] sm:text-sm"
              >
                <option>[Select]</option>
              </select>
            </div>
            {/* Description */}
            <div className="">
              <label htmlFor="description" className="block font-bold">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter package description here..."
                maxLength={100}
                rows={4}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#3798E3] focus:border-[#3798E3] sm:text-sm"
              ></textarea>
            </div>
            {/* Qty and Price Container */}
            <div className="flex gap-12">
              {/* Quantiy */}
              <div>
                <label htmlFor="qty" className="block font-bold">
                  *Quantity
                </label>
                <input
                  type="text"
                  id="qty"
                  name="qty"
                  placeholder="#"
                  className="w-full mt-1 block py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#3798E3] focus:border-[#3798E3] sm:text-sm"
                />
              </div>
              {/* Price */}
              <div>
                <label htmlFor="price" className="block font-bold">
                  *Price (USD)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="w-full mt-1 block py-3 px-3 pl-6 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#3798E3] focus:border-[#3798E3] sm:text-sm"
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
              className="bg-[#3798E3] text-white font-bold py-3 px-6 capitalize rounded-md hover:bg-[#2C7AB6]"
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

export default AddPackage;
