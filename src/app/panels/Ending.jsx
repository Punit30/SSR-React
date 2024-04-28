import { Box, CssBaseline, Typography } from "@mui/material"
import Link from "next/link"
import React from "react"
import { FiArrowRight } from "react-icons/fi"

function Ending() {
	return (
		<Box
			className="f justify-center align-center"
			gap={{ xs: "16px", md: "56px" }}
			padding={{ xs: "96px 56px", sm: "156px 16px", md: "260px 60px" }}
			sx={{ backgroundColor: "#F2EDFC" }}
		>
			<CssBaseline />
			<Box className="f f-c">
				<Typography
					color="#814CD6"
					fontSize={{ xs: "12px", sm: "14px", md: "18px" }}
					fontWeight="600"
					lineHeight={{ xs: "20px", sm: "32px", md: "40.726px" }}
					letterSpacing="1.62px"
					textTransform="uppercase"
				>
					CONTACT US
				</Typography>
				<Box className="f align-center" gap={{ xs: "4px", sm: "12px", md: "20px" }}>
					<Typography
						color="#1B1C20"
						fontFamily="Poppins"
						fontSize={{ xs: "28px", sm: "48px", md: "80px" }}
						fontWeight={{ xs: "600", sm: "600", md: "700" }}
						lineHeight={{ xs: "44px", sm: "52px", md: "normal" }}
						textTransform="capitalize"
					>
						Let's Talk
					</Typography>
					<Box
						className="f"
						minWidth="32px"
						minHeight="32px"
						width={{ xs: "32px", sm: "48px", md: "72px" }}
						height={{ xs: "32px", sm: "48px", md: "72px" }}
					>
						<img src="/assets/svgs/hand-wave.svg" width="auto" height="auto" />
					</Box>
				</Box>
			</Box>
			<Link href="contact-us" aria-label="contact-us">
				<Box
					className="f b-rhalf"
					sx={{ backgroundColor: "#814CD6", fontSize: { xs: "28px", sm: "36px", md: "60px" } }}
					padding={{ xs: "16px", sm: "24px", md: "36px" }}
				>
					<FiArrowRight color="#FFF" />
				</Box>
			</Link>
		</Box>
	)
}

export default Ending
