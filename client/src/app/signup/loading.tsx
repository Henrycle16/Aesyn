import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <Box className="grid h-16 place-items-center">
      <CircularProgress />
    </Box>
  );
}
