import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

const ProfileLanding = () => {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
        <Box sx={{ padding: 2, border: "1px solid grey", borderRadius: 4 }}>
          <Typography variant="h6">
            Creator Interest, Bio, and Social Media
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ padding: 2, border: "1px solid grey", borderRadius: 4 }}>
          <Typography variant="h6">Package</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ padding: 2, border: "1px solid grey", borderRadius: 4 }}>
          <Typography variant="h6">Portfolio</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfileLanding;
