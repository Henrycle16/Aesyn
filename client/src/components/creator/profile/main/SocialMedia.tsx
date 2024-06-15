import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const SocialMedia = () => {
  return (
    <div className="flex-[1.25]">
      <div className="flex justify-start">
        <h1 className="text-2xl font-semibold text-[#184465]">Social Media </h1>
        <ModeEditOutlineOutlinedIcon
          sx={{ color: "#3798E3", fontSize: 25 }}
          className="border-2 border-[#3798E3] rounded-full p-[.12rem] cursor-pointer ml-3 mt-1"
        />
      </div>
    </div>
  )
}

export default SocialMedia