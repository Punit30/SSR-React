import { Box, CssBaseline, Stack } from "@mui/material"
import React from "react"
import WhyJoinUs from "./panels/WhyJoinUs"
import StepsToJoin from "./panels/StepsToJoin"
import TriangleDesign from "./panels/TriangleDesign"
import Ending from "./panels/Ending"
import Hero from "./panels/Hero"

function Home() {
	return (
		<>
			<CssBaseline />
			<Stack>
				<Hero />
				<WhyJoinUs />
				<StepsToJoin />
				<TriangleDesign />
				<Ending />
			</Stack>
		</>
	)
}

export default Home
