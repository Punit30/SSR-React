import { Fab, Fade, useScrollTrigger } from "@mui/material"
import React from "react"
import { FiChevronUp } from "react-icons/fi"

function ScrollToTop({ bottom = 16, right = 16, threshold = 100, ...props }) {
	const scrollTrigger = useScrollTrigger({
		target: props.window ? window() : undefined,
		disableHysteresis: true,
		threshold: threshold,
	})

	return (
		<Fade in={scrollTrigger}>
			<Fab
				size="small"
				color="secondary"
				aria-label="add"
				sx={{
					position: "fixed",
					bottom: bottom,
					right: right,
					color: "#814cd6",
					bgcolor: "#f2edfc",
					"&:hover": {
						color: "#fff",
						bgcolor: "#814cd6",
					},
				}}
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			>
				<FiChevronUp size="16px" />
			</Fab>
		</Fade>
	)
}

export default ScrollToTop
