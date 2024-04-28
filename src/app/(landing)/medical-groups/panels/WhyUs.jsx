import { Box, CssBaseline, Typography } from "@mui/material"
import React from "react"
import WhyUsCard from "../widgets/WhyUsCard"
import ElementPlus from "@/Constants/svgs/ElementPlus"
import Separator from "@/components/utilities/Separator"

const WhyUsIcon1 ="/images/medical-groups/why-us-icon-1.png"
const WhyUsIcon2 ="/images/medical-groups/why-us-icon-2.png"
const WhyUsImg1 ="/images/medical-groups/why-us-img-1.png"
const WhyUsImg2 ="/images/medical-groups/why-us-img-2.png"

function WhyUs() {
	return (
		<Box
			className="f f-c"
			position="relative"
			padding={{ xs: "64px 16px", md: "64px 86px", lg: "88px 144px" }}
			gap={{ xs: "48px", md: "81px" }}
			sx={{ overflow: "hidden" }}
		>
			<CssBaseline />
			<Box className="f f-c g24" zIndex={1}>
				<Typography
					color="#1B1C20"
					fontFamily="Poppins"
					fontSize={{ xs: "24px", sm: "32px", md: "48px" }}
					fontWeight={600}
					lineHeight={{ xs: "33px", sm: "44px", md: "55px" }}
				>
					Why us
				</Typography>
				<Separator type="small" width="189px" />
			</Box>
			<Box
				className="f justify-s-b "
				flexDirection={{ xs: "column", sm: "row" }}
				gap={{ xs: "80px", md: "24px" }}
				zIndex={1}
			>
				<WhyUsCard
					icon={WhyUsIcon1}
					img={WhyUsImg1}
					title="Provider training"
					description={[
						"Access to curated LGBTQIA+ CME courses and in house content from industry leaders.",
						"Well trained providers lead to happier patients and greater retention rates.",
					]}
				/>
				<WhyUsCard
					icon={WhyUsIcon2}
					img={WhyUsImg2}
					title="Provider credentialing"
					description={[
						"Make it easy for patients to find trusted clinicians who provide inclusive care.",
						"Inclusive practices are important to both LGBTQIA+ community members and allies.",
					]}
				/>
			</Box>
			<Box position="absolute" top="0px" right="-116px" zIndex={0} display={{ xs: "none", sm: "flex" }}>
				<ElementPlus color="#F2EDFC" size="302px" logo={false} opacity="0.5" />
			</Box>
			<Box position="absolute" bottom="20px" left="-116px" zIndex={0} display={{ xs: "none", sm: "flex" }}>
				<ElementPlus color="#F2EDFC" size="240px" logo={false} opacity="0.5" />
			</Box>
		</Box>
	)
}

export default WhyUs
