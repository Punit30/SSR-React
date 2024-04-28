import { Box, CssBaseline, Typography } from "@mui/material"
import React from "react"
import StepsToJoinRow from "../widgets/StepsToJoinRow"
import ElementPlus from "@/Constants/svgs/ElementPlus"
import Separator from "@/components/utilities/Separator"


const joinImg1 ="/images/providers/joining-img-1.png"
const joinImg2 ="/images/providers/joining-img-2.png"
const joinImg3 ="/images/providers/joining-img-3.png"

function StepsToJoin() {
	return (
		<Box
			className="f f-c align-center justify-center"
			position="relative"
			padding={{ xs: "64px 16px", md: "80px" }}
			gap={{ xs: "48px", md: "121px" }}
			sx={{ overflow: "hidden" }}
		>
			<CssBaseline />
			<Box className="f f-c align-center g24" zIndex={1}>
				<Typography
					color="#1B1C20"
					textAlign="center"
					fontFamily="Poppins"
					fontSize={{ xs: "24px", sm: "32px", md: "48px" }}
					fontWeight={600}
					lineHeight={{ xs: "33px", sm: "44px", md: "55px" }}
				>
					Steps to join
				</Typography>
				<Separator type="small" width="189px" />
			</Box>
			<Box className="f f-c g64 w100" zIndex={1}>
				<StepsToJoinRow
					img={joinImg1}
					rowType="row"
					number="01"
					title="Provide basic information"
					description="We’ll ask you for some basic information to understand your medical background and experience."
				/>
				<StepsToJoinRow
					img={joinImg2}
					rowType="reverse"
					number="02"
					title="Demonstrate LGBTQIA+ knowledge"
					description="Our vetting process includes a baseline assessment to test your medical and cultural competency. Depending on the results, you may be required to complete courses to fill in your knowledge gaps."
				/>
				<StepsToJoinRow
					img={joinImg1}
					rowType="row"
					number="03"
					title="Get started"
					description="When you’ve been accepted, you can now access our educational material and showcase your practice on our platform."
				/>
			</Box>
			<Box position="absolute" top="-16px" left="-86px" zIndex={0}>
				<ElementPlus color="#F2EDFC" size="240px" logo={false} opacity="0.5" />
			</Box>
			<Box position="absolute" top="40%" right="-116px" zIndex={0}>
				<ElementPlus color="#F2EDFC" size="240px" logo={false} opacity="0.5" />
			</Box>
			<Box position="absolute" bottom="0px" left="-96px" zIndex={0}>
				<ElementPlus color="#F2EDFC" size="240px" logo={false} opacity="0.5" />
			</Box>
		</Box>
	)
}

export default StepsToJoin
