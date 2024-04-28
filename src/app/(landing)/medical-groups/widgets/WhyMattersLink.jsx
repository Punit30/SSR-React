import { Box, Link, Typography } from "@mui/material"
import React from "react"

const STYLES = {
	link: {
		color: "#717385",
		fontSize: "12px",
		fontWeight: "400",
		lineHeight: "18px",
		textDecorationColor: "#717385",
		":hover": { color: "#814CD6", textDecorationColor: "#814CD6" },
	},
}

function WhyMattersLink({ sx }) {
	return (
		<Box className="f-c g48" sx={sx}>
			<Box className="f flex-wrap justify-center g6 align-center">
				<Typography color="#717385" fontSize="12px" fontWeight="400" lineHeight="18px">
					Source:
				</Typography>
				<Link
					href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6370394/#s1-fp-34-11-28"
					target="_blank"
					sx={STYLES.link}
				>
					National Library of Medicine,
				</Link>
				<Link
					href="https://www.americanprogress.org/article/state-lgbtq-community-2020/"
					target="_blank"
					sx={STYLES.link}
				>
					American Progress,
				</Link>
				<Link
					href="https://news.gallup.com/poll/389792/lgbt-identification-ticks-up.aspx"
					target="_blank"
					sx={STYLES.link}
				>
					Gallup Poll
				</Link>
			</Box>
		</Box>
	)
}

export default WhyMattersLink
