import Separator from "@/components/utilities/Separator"
import { Box, CssBaseline, Typography } from "@mui/material"
import React from "react"
import { MdAutoGraph } from "react-icons/md"
import { TbFileSearch, TbHeartHandshake } from "react-icons/tb"
import JoinUsCard from "../widgets/JoinUsCard"
import Link from "next/link"
import Button from "@/components/utilities/Button"
import ElementPlus from "@/Constants/svgs/ElementPlus"

function WhyJoinUs() {
	return (
		<Box
			className="f f-c align-center justify-center"
			position="relative"
			padding={{ xs: "64px 16px", md: "80px" }}
			gap={{ xs: "48px", md: "64px" }}
			sx={{ backgroundColor: "#f2edfc", overflow: "hidden" }}
		>
			<CssBaseline />
			<Box className="f f-c align-center g24">
				<Typography
					color="#1B1C20"
					textAlign="center"
					fontFamily="Poppins"
					fontSize={{ xs: "24px", sm: "32px", md: "48px" }}
					fontWeight={600}
					lineHeight={{ xs: "33px", sm: "44px", md: "55px" }}
				>
					Why join us?
				</Typography>
				<Separator type="small" width="189px" />
			</Box>
			<Box className="f f-c align-center" gap={{ xs: "32px", md: "52px" }}>
				<Box className="f" gap={{ xs: "32px", md: "44px" }} flexDirection={{ xs: "column", md: "row" }}>
					<JoinUsCard
						icon={<TbFileSearch />}
						title="Easily find LGBTQIA+ medical information"
						description="Gain access to an education center with curated CME courses and vetted literature on LGBTQIA+ medical topics."
					/>
					<JoinUsCard
						icon={<MdAutoGraph />}
						title="Grow your patient panel"
						description="Expand your practice and reach a patient population that you're interested in caring for."
					/>
					<JoinUsCard
						icon={<TbHeartHandshake />}
						title="Demonstrate your commitment to inclusivity"
						description="Joining inclusive+ shows your commitment to providing healthcare to the LGBTQIA+ community."
					/>
				</Box>
				<Box width={{ xs: "100%", md: "fit-content" }} zIndex={1}>
					<Link href="/provider-comming-soon" style={{ textDecoration: "none" }}>
						<Button id="get_started" className="track_button" fullWidth variant="contained" color="purple">
							Get started
						</Button>
					</Link>
				</Box>
			</Box>
			<Box
				className="g7"
				maxWidth="60px"
				minWidth="60px"
				position="absolute"
				zIndex={0}
				top="153px"
				left="47px"
				display={{ xs: "none", sm: "flex" }}
			>
				<Box paddingTop="17px">
					<ElementPlus color="#814CD6" size="32px" logo={false} />
				</Box>
				<ElementPlus color="#814CD6" size="18px" logo={false} />
			</Box>
			<Box position="absolute" bottom="-92px" right="-36px" zIndex={0} display={{ xs: "none", sm: "flex" }}>
				<ElementPlus color="#FFF" size="296px" logo={false} opacity="0.5" />
			</Box>
		</Box>
	)
}

export default WhyJoinUs
