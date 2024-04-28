import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

function WhyItMattersData({title, description}) {
  return (
    <Box className="f f-c g32">
        <Box className="f f-c g8">
            <Typography
            color="#1B1C20"
            fontFamily="Poppins"
            fontSize={{xs: "40px", md: "48px"}}
            fontWeight="600"
            lineHeight={{xs: "55px", md:"70px"}}
            >
                {title}
            </Typography>
            <Typography
            color="#717385"
            fontSize="16px"
            fontWeight="400"
            lineHeight="24px"
            >
                {description}
            </Typography>
        </Box>
        <Divider />
    </Box>
  )
}

export default WhyItMattersData
