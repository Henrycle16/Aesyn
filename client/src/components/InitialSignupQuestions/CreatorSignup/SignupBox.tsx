"use client"

import { Box } from '@mui/material';
import React from 'react'
import MapBox from '../MapBox';


const SignupBox = () => {
  return (
    <div className="flex justify-center items-center h-auto pt-52">
      <Box
        className="p-5 bg-base-200 rounded-box"
        sx={{ width: "900px", height: "600px", border: "1px solid black" }}
      >
        <MapBox/>
        {/* <SocialMediaSelect/> */}
      </Box>
    </div>
  )
}

export default SignupBox;