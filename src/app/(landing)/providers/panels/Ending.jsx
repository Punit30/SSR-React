import { makeColor } from "@/components/utilities/Button"
import { Box, Button, CssBaseline, Typography } from "@mui/material"
import Link from "next/link"
import React from "react"
const  BusinessSVG = "/assets/svgs/business.svg"

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

function Ending() {
	return (
		<Box className="f f-c g16 align-center" padding="96px 16px" sx={{ backgroundColor: "#814CD6" }}>
			<CssBaseline />
			<img src={BusinessSVG} height="48px" width="48px" />
			<Box className="f f-c align-center" maxWidth="830px" gap={{ xs: "32px", md: "48x" }}>
				<Typography
					textAlign="center"
					color="#FFF"
					fontFamily="Poppins"
					fontSize={{ xs: "24px", md: "30px" }}
					fontWeight={{ xs: 500, md: 600 }}
					lineHeight={{ xs: "33px", md: "normal" }}
				>
					Join a network of providers committed to culturally responsive and medically appropriate LGBTQIA+
					care.
				</Typography>
				<Box width={{ xs: "100%", sm: "fit-content" }}>
					<Link href="/provider-comming-soon" style={{ textDecoration: "none" }}>
						<Button id="get_started" className="track_button" sx={buttonColor} fullWidth>
							Get Started
						</Button>
					</Link>
				</Box>
			</Box>
		</Box>
	)
}

export default Ending
