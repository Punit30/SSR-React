import ElementPlus from "@/Constants/svgs/ElementPlus"
import Separator from "@/components/utilities/Separator"
import { Box, CssBaseline, Typography } from "@mui/material"
import React from "react"


const FloatBox = ({ title, description, boxProps, elementPlusPosition, elementPlusSize, elementPlusColor }) => {
	return (
		<Box maxWidth="572px" position={{ xs: "static", md: "relative" }} {...boxProps}>
			<Box
				className="f f-c g16 b-r12"
				position="relative"
				padding={{ xs: "48px 24px 24px 24px", md: "56px 35px 40px 35px" }}
				border="1.758px solid #1B1C20"
				boxShadow="7.033px 7.033px 0px 0px #1B1D20"
				sx={{ backgroundColor: "#F2EDFC" }}
			>
				<Box position="absolute" {...elementPlusPosition}>
					<ElementPlus size={elementPlusSize} color={elementPlusColor} logo={false} />
				</Box>
				<Typography
					color="#000"
					fontFamily="Poppins"
					fontSize={{ xs: "24px", md: "28px" }}
					fontWeight="600"
					lineHeight={{ xs: "33px", md: "36px" }}
				>
					{title}
				</Typography>
				<Typography
					color="#1B1C20"
					fontSize={{ xs: "16px", md: "18px" }}
					fontWeight="400"
					lineHeight={{ xs: "24px", md: "28px" }}
				>
					{description}
				</Typography>
			</Box>
		</Box>
	)
}
function Services() {
	return (
		<Box
			className="f f-c align-center justify-center"
			position="relative"
			padding={{ xs: "64px 16px", md: "80px 80px 0px" }}
			gap={{ xs: "56px", md: "72px" }}
			sx={{ overflow: "hidden", backgroundColor: "#F2EDFC" }}
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
						OUR SERVICES
					</Typography>
					<Typography
						color="#1B1C20"
						textAlign="center"
						fontFamily="Poppins"
						fontSize={{ xs: "24px", sm: "32px", md: "48px" }}
						fontWeight={600}
						lineHeight={{ xs: "33px", sm: "44px", md: "55px" }}
					>
						Meeting your healthcare needs
					</Typography>
				</Box>
				<Separator type="small" width="189px" />
			</Box>
			<Box
				position="relative"
				height="fit-content"
				className="f f-c align-center justify-center w100"
				zIndex={1}
				gap={{ xs: "56px", md: "0px" }}
			>
				{FloatBox({
					title: "LGBTQIA+ Focused Care",
					description:
						"You don’t have to educate your doctors anymore. We ensure that providers in our directory stay up-to-date on the newest LGBTQIA+ medical research.",
					boxProps: { width: { xs: "100%", md: "45%" }, top: "0px", left: "-24%" },
					elementPlusPosition: { top: "-29px", left: "30px" },
					elementPlusSize: "56px",
					elementPlusColor: "#03BBFD",
				})}
				{FloatBox({
					title: "Thoroughly Vetted Providers",
					description:
						"Providers must pass an exam and fulfill ongoing education to be featured in the inclusive+ directory. We take the time to find the right providers, so you don’t have to.",
					boxProps: { width: { xs: "100%", md: "45%" }, top: "-145px", left: "23%", zIndex: 2 },
					elementPlusPosition: { top: "-29px", left: "30px" },
					elementPlusSize: "56px",
					elementPlusColor: "#96C41D",
				})}
				{FloatBox({
					title: "Personalized Search",
					description:
						"Find providers that acknowledge or understand your experiences. Our directory will allow you to filter by characteristics like gender identity, race, and previous medical experience with the ability to select specific LGBTQIA+ healthcare services.",
					boxProps: { width: { xs: "100%", md: "45%" }, top: "-185px", left: "-8%" },
					elementPlusPosition: { top: "-29px", left: "30px" },
					elementPlusSize: "56px",
					elementPlusColor: "#FF449F",
				})}
			</Box>
			<Box
				className="g7"
				maxWidth="60px"
				minWidth="60px"
				position="absolute"
				zIndex={0}
				bottom="164px"
				right="144px"
				display={{ xs: "none", sm: "flex" }}
			>
				<Box paddingTop="10px">
					<ElementPlus color="#814CD6" size="26px" logo={false} />
				</Box>
				<ElementPlus color="#814CD6" size="12px" logo={false} />
			</Box>
			<Box position="absolute" top="0px" left="-46px" zIndex={0} display={{ xs: "none", sm: "flex" }}>
				<ElementPlus color="#FFF" size="322px" logo={false} opacity="0.8" />
			</Box>
		</Box>
	)
}

export default Services
