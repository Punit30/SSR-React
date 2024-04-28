import { Box, CssBaseline, Typography } from "@mui/material"
import React from "react"
import ElementPlus from "@/Constants/svgs/ElementPlus"
import Image from "@/components/utilities/Image"
import Separator from "@/components/utilities/Separator"

const InvestorNSF = "/images/landing/investor-nsf.png"
const InvestorNVC = "/images/landing/investor-nvc.png"
const InvestorPOLSKY = "/images/landing/investor-polsky.png"

function Supporters() {
	return (
		<Box
			className="f f-c align-center justify-center"
			position="relative"
			padding={{ xs: "64px 16px", md: "80px" }}
			gap={{ xs: "56px", md: "72px" }}
			sx={{ overflow: "hidden" }}
		>
			<CssBaseline />
			<Box className="f f-c align-center g24" zIndex={1}>
				<Box className="f f-c align-center">
					<Typography
						color="#6728CC"
						textAlign="center"
						fontSize={{ xs: "12px", md: "14px" }}
						fontWeight="600"
						lineHeight="20px"
						letterSpacing={{ xs: "0.48px", md: "0.56px" }}
						textTransform="uppercase"
					>
						OUR SUPPORTERS
					</Typography>
					<Typography
						color="#1B1C20"
						textAlign="center"
						fontFamily="Poppins"
						fontSize={{ xs: "24px", sm: "32px", md: "48px" }}
						fontWeight={600}
						lineHeight={{ xs: "33px", sm: "44px", md: "55px" }}
					>
						Thank you to our supporters
					</Typography>
				</Box>
				<Separator type="small" width="189px" />
			</Box>
			<Box className="f g24 align-center justify-s-e w100" zIndex={1} maxWidth="800px">
				<Image src={InvestorNSF} width="188px" height="188px" />
				<Image src={InvestorPOLSKY} width="188px" height="188px" />
				<Image src={InvestorNVC} width="188px" height="188px" />
			</Box>
			<Box
				className="g7"
				maxWidth="60px"
				minWidth="60px"
				position="absolute"
				zIndex={0}
				top="164px"
				left="66px"
				display={{ xs: "none", sm: "flex" }}
			>
				<Box paddingTop="10px">
					<ElementPlus color="#814CD6" size="26px" logo={false} />
				</Box>
				<ElementPlus color="#814CD6" size="12px" logo={false} />
			</Box>
			<Box position="absolute" bottom="-96px" right="-96px" zIndex={0} display={{ xs: "none", sm: "flex" }}>
				<ElementPlus color="#F2EDFC" size="240px" logo={false} opacity="0.5" />
			</Box>
		</Box>
	)
}

export default Supporters
