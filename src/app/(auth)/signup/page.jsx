import InitialSignForm from "@/components/common/Forms/InitialSignupForm";
import { Box, CssBaseline, Typography } from "@mui/material";
import React from "react";

function InitialSignUpPage() {
  return (
    <>
      <CssBaseline />
      <Box
        overflow="auto"
        className="f f-c h100"
        gap={{ xs: "32px", md: "48px" }}
        padding={{ xs: "0px 16px", sm: "0px 24px", md: "64px 54px 20px" }}
      >
        <Box className="f f-c g8">
          <Typography
            color="#1B1C20"
            fontFamily="Poppins"
            fontSize={{ xs: "24px", md: "32px" }}
            fontWeight="600"
            lineHeight={{ xs: "33px", md: "44px" }}
          >
            We are happy to have you here!
          </Typography>
          <Typography
            color="#717385"
            fontSize="16px"
            fontWeight="400"
            lineHeight="26px"
          >
            Please select the option that best describes you.
          </Typography>
        </Box>
        <Box className="f f-c justify-s-b g24 h100">
          <InitialSignForm />
        </Box>
      </Box>
    </>
  );
}

export default InitialSignUpPage;
