import Image from "@/components/utilities/Image";
import { Box, CssBaseline, Typography } from "@mui/material";
import _ from "lodash";
import React from "react";
const CheckIconSVG = "/assets/svgs/check-icon.svg";

function WhyUsCard({ img, icon, title, description }) {
  return (
    <Box className="f f-c" gap={{ xs: "16px", md: "32px" }}>
      <CssBaseline />
      <Box className="f f-c g16">
        <Image src={icon} width="72px" height="72px" />
        <Typography
          color="#000"
          fontFamily="Poppins"
          fontSize={{ xs: "20px", md: "28px" }}
          fontWeight="600"
          lineHeight={{ xs: "30px", md: "36px" }}
        >
          {title}
        </Typography>
      </Box>
      <Box className="f f-c" gap={{ xs: "24px", md: "32px" }}>
        <Image src={img} width="505px" height="261px" />
        <Box className="f f-c g32 algin-start">
          {_.map(description, (item, index) => {
            return (
              <Box className="f g24" key={index}>
                <img src={CheckIconSVG} width="28px" height="28px" />
                <Typography
                  color="#1B1C20"
                  fontSize="18px"
                  fontWeight="400"
                  lineHeight="26px"
                >
                  {item}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default WhyUsCard;
