import { Box } from "@mui/material"

const STYLES = {
	bar: {
		height: "4px",
		width: "100%",
	},
}

function Stepper({ color, borderRadius="8px", currentStep = 0, steps = 0 }) {
	const totalStep = Math.max(steps, 0)
	const filledBar = Math.max(currentStep, 0)

	const bars = Array.from({ length: totalStep }).map((_, idx) => (
		<Box
			key={idx}
			component="span"
			sx={{ ...STYLES.bar, backgroundColor: idx < filledBar ? color : "#D9DAE6", borderRadius }}
		/>
	))

	return <Box className="f align-center g10 w100">{bars}</Box>
}

export default Stepper
