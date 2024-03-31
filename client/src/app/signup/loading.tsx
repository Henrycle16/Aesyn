import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function Loading() {

return (
  <Box className="grid h-16 place-items-center">
      <CircularProgress />
    </Box>
);
}