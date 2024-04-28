import { makeColor } from "@/components/utilities/Button"
import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"
import React from "react"

const BusinessSVG = "/assets/svgs/business.svg"

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
		<Box className="f" padding={{ xs: "0px 16px 64px 16px", md: "40px 64px 40px 64px" }}>
			<Box
				className="f f-c align-center justify-center b-r24 w100"
				padding={{ xs: "40px 24px", md: "96px 24px" }}
				sx={{ backgroundColor: "#814CD6" }}
			>
				<Box className="f f-c g40 align-center" maxWidth="830px">
					<Box className="f f-c align-center g16">
						<img src={BusinessSVG} height="48px" width="48px" />
						<Typography
							color="#FFF"
							textAlign="center"
							fontFamily="Poppins"
							fontSize={{ xs: "24px", md: "30px" }}
							fontWeight="500"
						>
							Differentiate your practice & be one of the few that know how to treat LGBTQIA+ patients
						</Typography>
					</Box>
					<Box width={{ xs: "100%", sm: "fit-content" }}>
						<Link href="/comming-soon" style={{ textDecoration: "none" }}>
							<Button id="partner_with_us" className="track_button" sx={buttonColor} fullWidth>
								Partner with us
							</Button>
						</Link>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default Ending
