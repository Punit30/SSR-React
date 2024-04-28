import Separator from "@/components/utilities/Separator"
import { Box, CssBaseline, Typography } from "@mui/material"
import React from "react"
import WhyItMattersData from "../widgets/WhyItMattersData"
import WhyMattersLink from "../widgets/WhyMattersLink"
import Link from "next/link"
import Button from "@/components/utilities/Button"
import ElementPlus from "@/Constants/svgs/ElementPlus"


const WhyItMattersImg = "/images/medical-groups/why-it-matters.webp"

function WhyItMatters() {
	return (
		<Box
			className="f f-c align-center justify-center"
			position="relative"
			padding={{ xs: "80px 16px", md: "80px 78px", lg: "80px 104px" }}
			gap={{ xs: "48px", md: "40px" }}
			sx={{ overflow: "hidden", backgroundColor: "#F9FAFB" }}
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
					Why it matters
				</Typography>
				<Separator type="small" width="189px" />
			</Box>
			<Box
				className="f"
				alignItems={{ xs: "center", lg: "end" }}
				flexDirection={{ xs: "column", md: "row" }}
				gap="60px"
				zIndex={1}
			>
				<Box className="f f-c g24" alignItems={{ xs: "start", sm: "end" }} maxWidth="660px">
					<WhyItMattersData
						title="4.4%"
						description="Only 4.4% of primary care providers strongly agreed that they had adequate training of health needs in the LGBTQIA+ population."
					/>
					<WhyItMattersData
						title="68%"
						description="68% of LGBTQIA+ people find it very important that their healthcare provider has specific training working with the LGBQIA+ community."
					/>
					<WhyItMattersData
						title="2x"
						description="Percentage of adults who identify as LGBTQIA+ has doubled over the past decade. Today, over 1 in 5 Gen Z adults identify as LGBTQIA+."
					/>
				</Box>
				<WhyMattersLink sx={{ display: { xs: "flex", md: "none" } }} />
				<Box className="f align-end why-matters-img-con" minWidth={{ xs: "none", md: "480px" }}>
					<img src={WhyItMattersImg} alt="why-it-matters" className="why-matters-img-con__img" />
					<Box className="why-matters-img-con__bg" />
				</Box>
			</Box>
			<WhyMattersLink sx={{ display: { xs: "none", md: "flex" } }} />
			<Box width={{ xs: "100%", sm: "fit-content" }}>
				<Link href="/comming-soon" style={{ textDecoration: "none" }}>
					<Button id="partner_with_us" className="track_button" variant="contained" color="purple" fullWidth>
						Partner with us
					</Button>
				</Link>
			</Box>
			<Box position="absolute" top="-50px" right="-116px" zIndex={0} display={{ xs: "none", sm: "flex" }}>
				<ElementPlus color="#F2EDFC" size="295px" logo={false} opacity="0.5" />
			</Box>
			<Box position="absolute" bottom="-20px" left="-116px" zIndex={0} display={{ xs: "none", sm: "flex" }}>
				<ElementPlus color="#F2EDFC" size="295px" logo={false} opacity="0.5" />
			</Box>
		</Box>
	)
}

export default WhyItMatters
