"use client";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const Bio = () => {
  return (
    <>
      <div className="flex-1">
        <div className="flex justify-start">
          <h1 className="text-2xl font-semibold text-[#184465]">Bio</h1>
          <ModeEditOutlineOutlinedIcon
            sx={{ color: "#3798E3", fontSize: 25 }}
            className="border-2 border-[#3798E3] rounded-full p-[.12rem] cursor-pointer ml-3 mt-1"
            onClick={() =>
              (
                document.getElementById(`bio_modal`) as HTMLDialogElement
              ).showModal()
            }
          />
        </div>
        <div className="flex flex-col">
          <p className=" text-[#061119] text-md mt-4 mb-10 flex-grow">
            Hi, I’m Calvin, and I live in the beautiful state of California. I’m
            a proud gay man living life to the fullest on the West Coast. By
            day, I’m a Professional Anal Inspector, passionate about guys. When
            I’m not working, you can find me exploring California’s stunning
            beaches, hiking trails, and vibrant city life. I’m an advocate for
            LGBTQ+ rights and love being part of such a supportive and diverse
            community. Whether it’s attending pride events, volunteering, or
            simply sharing stories, I’m all about celebrating love and
            individuality. In my free time, I enjoy gaming, discovering new
            music, and trying out the latest food spots in town. Always up for a
            good conversation and meeting new people, so don’t hesitate to reach
            out. Let’s connect and share our California adventures.
          </p>
        </div>
      </div>

      {/* Modal */}
      <dialog id="bio_modal" className="modal">
        <div className="modal-box bg-white text-[#061119] min-w-[58.75rem] pt-8 px-10 pb-6">
          <h1 className="text-[#184465] font-semibold text-2xl">Bio</h1>
          <h2 className="py-2 text-[#4A4A4A]">Give a brief description for your profile.</h2>
          <form method="dialog">
            <div className="">
              <textarea
                name="description"
                placeholder="Enter your bio here..."
                maxLength={100}
                rows={7}
                // ! Should not used defaultValue, use value instead with onChange. (Only for static data, defaultValue is used.)
                className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-[#3798E3] sm:text-sm"
                style={{
                  paddingLeft: "1%",
                  paddingTop: "1%",
                  resize: "none",
                  fontSize: "16px",
                }}
              ></textarea>
            </div>

            <div className="flex justify-end mt-10">
              {/* if there is a button, it will close the modal */}
              <button
                onClick={() => console.log("Save Bio")}
                // type="submit"
                className="bg-[#3798E3] text-white ml-auto py-3 px-6 capitalize font-bold rounded-md hover:bg-[#2C7AB6]"
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
    </>
  );
};

export default Bio;
