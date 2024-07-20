"use client";

import {
  creatorPackagesInfo,
} from "@/redux/slices/creatorPackages-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { addPackage as addPackageStore } from "@/redux/slices/creatorPackages-slice";

import { addPackage } from "@/actions/creatorApi";
import { useSession } from "next-auth/react";

const AddPackage =  () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentPackage = useAppSelector(
    (state) => state.creatorPackagesReducer.value.currentPackage
  );

  const session = useSession();
  const userId = session.data?.user.id;

  const createPackage = async ( userId: string, currentPackage: any) => {
    try {
      const response = await addPackage(userId, currentPackage);
      console.log(response.data);
      dispatch(addPackageStore(response.data));
    } catch (error) {
      console.error(error);
    }
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("userId: " + userId)
    createPackage(userId, currentPackage);
    (document.getElementById(`add_package_modal`) as HTMLDialogElement).close();
  };

  return (
    <dialog id="add_package_modal" className="modal">
      <div className="modal-box bg-white text-[#061119] min-w-[60rem] pt-10 pl-14 pr-10 pb-8">
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
        <form method="dialog" onSubmit={onFormSubmit}>
          {/* Input Fields Container */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-7">
            {/* Social Media Select */}
            <div>
              <label
                htmlFor="social_media"
                className="text-[#4A4A4A] block font-bold"
              >
                *Social Media
              </label>
              <select
                id="social_media"
                name="social_media"
                value={currentPackage.socialMedia}
                onChange={(e) => {
                  dispatch(
                    creatorPackagesInfo({
                      currentPackage: {
                        ...currentPackage,
                        socialMedia: e.target.value,
                      },
                    })
                  );
                }}
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
              <label
                htmlFor="package_type"
                className="text-[#4A4A4A] block font-bold"
              >
                *Package Type
              </label>
              <select
                id="package_type"
                name="package_type"
                value={currentPackage.type}
                onChange={(e) => {
                  dispatch(
                    creatorPackagesInfo({
                      currentPackage: {
                        ...currentPackage,
                        type: e.target.value,
                      },
                    })
                  );
                }}
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
              <label
                htmlFor="description"
                className="text-[#4A4A4A] block font-bold"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter package description here..."
                maxLength={100}
                rows={4}
                value={currentPackage.description}
                onChange={(e) => {
                  dispatch(
                    creatorPackagesInfo({
                      currentPackage: {
                        ...currentPackage,
                        description: e.target.value,
                      },
                    })
                  );
                }}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-[#3798E3] sm:text-sm"
              ></textarea>
            </div>
            {/* Qty and Price Container */}
            <div className="flex gap-12">
              {/* Quantiy */}
              <div>
                <label htmlFor="qty" className="text-[#4A4A4A] block font-bold">
                  *Quantity
                </label>
                <input
                  type="number"
                  id="qty"
                  name="qty"
                  placeholder="#"
                  value={currentPackage.quantity}
                  onChange={(e) => {
                    dispatch(
                      creatorPackagesInfo({
                        currentPackage: {
                          ...currentPackage,
                          quantity: +e.target.value,
                        },
                      })
                    );
                  }}
                  className="w-full mt-1 block py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-[#3798E3] sm:text-sm"
                />
              </div>
              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="text-[#4A4A4A] block font-bold"
                >
                  *Price (USD)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={currentPackage.price}
                  onChange={(e) => {
                    dispatch(
                      creatorPackagesInfo({
                        currentPackage: {
                          ...currentPackage,
                          price: +e.target.value,
                        },
                      })
                    );
                  }}
                  className="w-full mt-1 block py-3 px-3 pl-6 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-[#3798E3] sm:text-sm"
                />
                <span className="absolute right-auto top-[54%] ml-4 text-sm">
                  $
                </span>
              </div>
            </div>
          </div>
          {/* Action Buttons -- if there is a button in form, it will close the modal */}
          <div className="flex justify-end mt-14">
            <button
              type="submit"
              className="bg-[#3798E3] text-white font-bold py-3 px-6 capitalize rounded-md hover:bg-[#2C7AB6]"
            >
              Save
            </button>
          </div>
          <button 
            onClick={() => {
              (document.getElementById(`add_package_modal`) as HTMLDialogElement).close();
              // TODO: Add logic to show unsaved changes modal if there are any changes
              // (document.getElementById(`unsaved_modal`) as HTMLDialogElement).showModal();
            }}
            type="button"
            className="btn btn-lg btn-circle btn-ghost outline-none absolute right-4 top-2 text-lg">
            ✕
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default AddPackage;
