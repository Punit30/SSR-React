import { Typography, Box } from "@mui/material"
import React from "react"
import TickFilledSVG from "../../Constants/svgs/TickFilledSVG"

const NameMailFormat = (props) => {
	const { value, data } = props

	return (
		<Box className="f f-c">
			<Typography
				className="f align-center g4"
				fontWeight={500}
				fontSize="14px"
				lineHeight="20px"
				color="#101828"
			>
				{value} {data.isVetted && <TickFilledSVG />}
			</Typography>
			<Typography fontWeight={400} fontSize="14px" lineHeight="20px" color="#667085">
				{data.email}
			</Typography>
		</Box>
	)
}

export default NameMailFormat
