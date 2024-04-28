import ElementPlus from "@/Constants/svgs/ElementPlus"
import Image from "@/components/utilities/Image"
import Separator from "@/components/utilities/Separator"
import { Box, CssBaseline, Typography } from "@mui/material"
import React from "react"

const WhoWeAreImg ="/images/landing/who-we-are.webp"

function WhoWeAre() {
	return (
		<Box
			position="relative"
			overflow="hidden"
			className="f g36 align-center justify-s-b"
			flexDirection={{ xs: "column", md: "row" }}
			padding={{ xs: "64px 16px", md: "88px 105px" }}
		>
			<CssBaseline />
			<Box className="f f-c justify-center g24" maxWidth="644px" alignItems={{ xs: "center", md: "start" }}>
				<Box className="f f-c">
					<Typography
						color="#6728CC"
						fontSize={{ xs: "12px", md: "14px" }}
						fontWeight="600"
						lineHeight="20px"
						letterSpacing={{ xs: "0.48px", md: "0.56px" }}
						textTransform="uppercase"
						textAlign={{ xs: "center", md: "start" }}
					>
						ABOUT US
					</Typography>
					<Typography
						color="#1B1C20"
						fontFamily="Poppins"
						fontSize={{ xs: "24px", sm: "32px", md: "48px" }}
						fontWeight={600}
						lineHeight={{ xs: "33px", sm: "44px", md: "55px" }}
						textAlign={{ xs: "center", md: "start" }}
					>
						Who are we?
					</Typography>
				</Box>
				<Separator type="small" width="189px" />
				<Box className="f g24 align-center justify-s-e w100" maxWidth="464px" zIndex={1}>
					<Typography
						textAlign={{ xs: "center", md: "start" }}
						fontWeight="400"
						fontSize="16px"
						lineHeight="28px"
					>
						inclusive+ is a network of providers committed to culturally and medically competent LGBTQIA+
						care. All providers are thoroughly vetted by our team so you can feel confident in the care you
						receive.
					</Typography>
				</Box>
			</Box>
			<Image
				src={WhoWeAreImg}
				height="438px"
				width="496px"
				boxProps={{ sx: { display: "flex", borderRadius: "24px", overflow: "hidden", zIndex: 1 } }}
			/>
			<Box
				className="g7"
				maxWidth="60px"
				minWidth="60px"
				position="absolute"
				zIndex={0}
				top="124px"
				left="66px"
				display={{ xs: "none", sm: "flex" }}
			>
				<Box paddingTop="10px">
					<ElementPlus color="#814CD6" size="26px" logo={false} />
				</Box>
				<ElementPlus color="#814CD6" size="12px" logo={false} />
			</Box>
			<Box position="absolute" bottom="-66px" right="-56px" zIndex={0} display={{ xs: "none", sm: "flex" }}>
				<ElementPlus color="#F2EDFC" size="308px" logo={false} />
			</Box>
		</Box>
	)
}

export default WhoWeAre
