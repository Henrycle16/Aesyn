'use client'

import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: '#E0E3E7',
    borderWidth: 1,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 1,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 4,
    padding: '4px !important',
  },
});

export default function BrandQuestions() {
  return (
    <Box sx= {{display: 'grid', placeItems: 'center', height: '100%' }}> 
    <Box
      component="form"
      noValidate
      sx={{
       width: '60%',
      }}
    >
      <ValidationTextField
        label="Company Name:"
        required
        variant="outlined"
        defaultValue="Success"
        id="validation-outlined-input"
      />
    </Box>
    </Box>
  );
}