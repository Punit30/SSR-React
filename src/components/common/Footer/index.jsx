"use client";
import Separator from "@/components/utilities/Separator";
import { Box, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import { FiMail, FiMapPin } from "react-icons/fi";

const logo = "/images/logo-white.png";

const useStyles = makeStyles({
  link: {
    color: "#9a9cb0",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "20px",
    textDecoration: "none",

    "&:hover": {
      textDecoration: "underline",
      color: "#fff !important",
    },
  },
});

function Footer() {
  const classes = useStyles();

  return (
    <Box
      className="f f-c"
      gap={{ xs: "64px", md: "96px" }}
      padding={{ xs: "64px 32px", md: "64px 136px" }}
      backgroundColor="#1B1C20"
    >
      <Box
        className="f f-r"
        sx={{ flexFlow: "wrap" }}
        gap={{ xs: "40px", md: "24px" }}
        justifyContent={{
          xs: "flex-start",
          sm: "flex-start",
          md: "space-between",
        }}
      >
        <Box width={{ xs: "100%", md: "auto" }} order={1}>
          <Box
            width={{ xs: "174px", md: "238px" }}
            height={{ xs: "32px", md: "42px" }}
          >
            <Link
              aria-label="landing-page"
              href="/"
              style={{ textDecoration: "none" }}
            >
              <img src={logo} width="100%" height="100%" />
            </Link>
          </Box>
        </Box>
        <Box
          className="f f-c"
          paddingTop="8px"
          gap={{ xs: "8px", md: "16px" }}
          order={3}
          width={{ xs: "45%", md: "auto" }}
        >
          <Typography
            color="#FFF"
            fontSize="14px"
            fontWeight="400"
            lineHeight="20px"
          >
            Partners
          </Typography>
          <Stack className="f f-c g8">
            <Link href="/providers" className={classes.link}>
              Providers
            </Link>
            <Link href="/medical-groups" className={classes.link}>
              Medical groups
            </Link>
            <Link href="/investors" className={classes.link}>
              Investors
            </Link>
          </Stack>
        </Box>
        <Box
          className="f f-c"
          paddingTop="8px"
          gap={{ xs: "8px", md: "16px" }}
          order={4}
          width={{ xs: "45%", md: "auto" }}
        >
          <Typography
            color="#FFF"
            fontSize="14px"
            fontWeight="400"
            lineHeight="20px"
          >
            Company
          </Typography>
          <Stack className="f f-c g8">
            <Link href="/medical-groups" className={classes.link}>
              Sign up
            </Link>
            <Link href="/contact-us" className={classes.link}>
              Contact us
            </Link>
            <Link href="/terms-of-use" className={classes.link}>
              Terms of use
            </Link>
            <Link href="/privacy-policy" className={classes.link}>
              Privacy policy
            </Link>
          </Stack>
        </Box>
        <Box
          className="f f-c"
          gap={{ xs: "24px", md: "48px" }}
          order={{ xs: 2, md: 6 }}
          width={{ xs: "100%", md: "auto" }}
        >
          <Box className="f f-c g8">
            <Typography
              color="#FFF"
              fontSize={{ xs: "14px", md: "18px" }}
              fontWeight="500"
              lineHeight={{ xs: "20px", md: "26px" }}
            >
              Get in touch with us
            </Typography>
            <Box className="f g24">
              <Link
                aria-label="facebook"
                href="https://www.facebook.com/people/Inclusive/100088698012527/"
                target="_blank"
                className={classes.link}
                style={{ color: "#B1B7C4" }}
              >
                <BsFacebook size="28px" />
              </Link>
              <Link
                aria-label="instagram"
                href="https://www.instagram.com/inclusive_plus/"
                target="_blank"
                className={classes.link}
                style={{ color: "#B1B7C4" }}
              >
                <BsInstagram size="28px" />
              </Link>
              <Link
                aria-label="linkedin"
                href="https://www.linkedin.com/company/inclusiveplus/"
                target="_blank"
                className={classes.link}
                style={{ color: "#B1B7C4" }}
              >
                <BsLinkedin size="28px" />
              </Link>
            </Box>
          </Box>
          <Box className="f f-c g6">
            <Typography
              className="f align-center g6"
              color="#9a9cb0"
              fontSize={{ xs: "14px", md: "16px" }}
              fontWeight="400"
              lineHeight="20px"
              sx={{ textDecoration: "none" }}
            >
              <FiMail size="16px" /> info@inclusiveplus.co
            </Typography>
            <Typography
              className="f align-center g6"
              color="#9a9cb0"
              fontSize={{ xs: "14px", md: "16px" }}
              fontWeight="400"
              lineHeight="20px"
              sx={{ textDecoration: "none" }}
            >
              <FiMapPin size="16px" /> Chicago, IL
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="f f-c align-center" gap={{ xs: "16px", md: "24px" }}>
        <Separator width="100%" type="large" />
        <Typography
          component="p"
          color="#9a9cb0"
          fontSize="14px"
          fontWeight="400"
          lineHeight="20px"
        >
          Copyright © 2024 Inclusiveplus.co
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
