import { makeColor } from "@/components/utilities/Button"
import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"
import React from "react"

const Doctors = "/images/medical-groups/doctors.webp"

const buttonColor = {
	...makeColor({
		bgColor: "#FFF",
		bgHoverColor: "transparent",
		borderColor: "#FFF",
		borderHoverColor: "#FFF",
		color: "#814CD6",
		colorHover: "#FFF",
		shadowColor: "none",
		disbabledBgColor: "transparent",
		disabledBorderColor: "transparent",
		disabledColor: "transparent",
	}),
	padding: "12px 26px",
}

function Hero() {
	return (
		<Box
			className="f f-c align-center"
			gap={{ xs: "48px", md: "81px" }}
			sx={{ overflow: "hidden", backgroundColor: "#814CD6" }}
		>
			<Box
				className="f f-c align-center"
				gap={{ xs: "32px", sm: "56px" }}
				padding={{ xs: "64px 16px 0px", md: "64px 86px 0px", lg: "88px 144px 0px" }}
			>
				<Box className="f f-c g8 align-center" maxWidth="808px">
					<Typography
						color="#B592F6"
						fontSize="16px"
						fontWeight="600"
						letterSpacing="1.28px"
						textTransform="uppercase"
					>
						Medical groups
					</Typography>
					<Box className="f f-c align-center" gap={{ xs: "16px", sm: "24px" }}>
						<Typography
							fontFamily="Poppins"
							fontWeight="700"
							fontSize={{ xs: "32px", sm: "40px", md: "48px" }}
							lineHeight="120%"
							textAlign="center"
							color="#ffffff"
						>
							Differentiate your practice
						</Typography>
						<Typography
							textAlign="center"
							color="#ffffff"
							fontWeight="400"
							fontSize="18px"
							lineHeight="28px"
						>
							inclusive+ is the only platform that offers both cultural and medical competency for
							LGBTQIA+ medicine. Our training and credentialing platform will help instill trust between
							your practice and the LGBTQIA+ community
						</Typography>
					</Box>
				</Box>
				<Box width={{ xs: "100%", sm: "fit-content" }} maxWidth="808px">
					<Link href="/comming-soon" style={{ textDecoration: "none" }}>
						<Button id="partner_with_us" className="track_button" sx={buttonColor} fullWidth>
							Partner with us
						</Button>
					</Link>
				</Box>
			</Box>
			<Box
				width="100%"
				sx={{
					background: {
						xs: "linear-gradient(to bottom, #814cd6 20%, #ffffff 20% 100%)",
						sm: "linear-gradient(to bottom, #814cd6 50%, #ffffff 50% 100%)",
					},
				}}
				padding={{ xs: "0px 16px 64px", md: "0px 86px 64px", lg: "0px 144px 88px" }}
			>
				<Box
					className="f f-c align-center w100"
					sx={{
						height: "fit-content",
					}}
				>
					<img src={Doctors} alt="doctors" className="hero-img" />
				</Box>
			</Box>
		</Box>
	)
}

export default Hero
