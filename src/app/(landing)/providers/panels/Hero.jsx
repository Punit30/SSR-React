import { makeColor } from "@/components/utilities/Button"
import Image from "@/components/utilities/Image"
import { Box, Button, CssBaseline, Typography } from "@mui/material"
import Link from "next/link"
import React from "react"


const doctor ="/images/providers/doctor.webp"

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
			className="f g36 align-center justify-s-b"
			flexDirection={{ xs: "column", md: "row" }}
			sx={{ backgroundColor: "#814CD6" }}
			padding={{ xs: "64px 16px", md: "60px 105px 60px" }}
		>
			<CssBaseline />
			<Box
				className="f f-c justify-center"
				maxWidth="644px"
				alignItems={{ xs: "center", md: "start" }}
				gap={{ xs: "24px", md: "56px" }}
			>
				<Box className="f f-c g24" alignItems={{ xs: "center", md: "start" }}>
					<Box className="f f-c g12" alignItems={{ xs: "center", md: "start" }}>
						<Typography
							color="#B592F6"
							fontSize={{ xs: "14px", sm: "16px" }}
							fontWeight="600"
							lineHeight={{ xs: "20px", sm: "normal" }}
							letterSpacing="1.28px"
							textTransform="uppercase"
						>
							For providers
						</Typography>
						<Typography
							textAlign={{ xs: "center", md: "start" }}
							color="#FFF"
							fontFamily="Poppins"
							fontSize={{ xs: "32px", sm: "48px" }}
							fontWeight="700"
							lineHeight={{ xs: "44px", sm: "58px" }}
						>
							Care for the LGBTQIA+ community
						</Typography>
					</Box>
					<Typography
						color="#FFF"
						fontSize="18px"
						fontWeight="400"
						lineHeight="28px"
						textAlign={{ xs: "center", md: "start" }}
					>
						Join a network of providers committed to culturally responsive and medically appropriate
						LGBTQIA+ care.
					</Typography>
				</Box>
				<Box width={{ xs: "100%", sm: "fit-content" }}>
					<Link href="/provider-comming-soon" style={{ textDecoration: "none" }}>
						<Button id="get_started" className="track_button" sx={buttonColor} fullWidth>
							Get Started
						</Button>
					</Link>
				</Box>
			</Box>
			<Image
				src={doctor}
				height="792px"
				width="528px"
				boxProps={{ sx: { display: "flex", borderRadius: "24px", overflow: "hidden" } }}
			/>
		</Box>
	)
}

export default Hero
