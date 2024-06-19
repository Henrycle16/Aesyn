import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const Interests = () => {
  // HardCoded for now
  const nichesArray = [
    { key: 0, label: "Actor" },
    { key: 1, label: "Beauty" },
    { key: 2, label: "Adventure & Outdoors" },
    { key: 3, label: "Travel" },
    { key: 4, label: "Health & Fitness" },
    { key: 5, label: "Food & Drink" },
  ];

  return (
    <div className="border-r border-gray-300 py-8 px-10">
      <div className="flex justify-start">
        <h1 className="text-2xl font-semibold text-[#184465]">Interests </h1>
        <ModeEditOutlineOutlinedIcon
          sx={{ color: "#3798E3", fontSize: 25 }}
          className="border-2 border-[#3798E3] rounded-full p-[.12rem] cursor-pointer ml-3 mt-1"
        />
      </div>

      <div className="flex flex-wrap pt-8 gap-x-2 gap-y-3">
        {nichesArray.map((data) => (
          <div
            key={data.key}
            className={
              "rounded-3xl text-base font-semibold w-auto py-2 px-6 bg-[#D8EEFE] text-[#3798E3] border-[1.5px] border-[#3798E3] inline-flex items-center justify-center"
            }
          >
            {data.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interests;
