import { Box, Checkbox, Typography } from "@mui/material"
import React from "react"
import { IoCheckmarkCircle, IoEllipseOutline } from "react-icons/io5"

function ProcessPanel({ isSelected, title, description, onChange = () => {} }) {
	return (
		<Box
			className="f g24 align-center justify-s-b b-r16 cursor-pointer"
			padding="32px"
			maxWidth="584px"
			border={`1px solid ${isSelected ? "#814CD6" : "#1B1C20"}`}
			sx={{ backgroundColor: isSelected ? "#FAF8FE" : "#FFF" }}
			onClick={onChange}
		>
			<Checkbox
				icon={<IoEllipseOutline size="24px" />}
				checkedIcon={<IoCheckmarkCircle size="24px" />}
				checked={isSelected}
			/>
			<Box className="f f-c g8">
				<Typography
					color="#1B1C20"
					fontFamily="Poppins"
					fontSize={{ xs: "18px", sm: "24px" }}
					fontWeight="600"
					lineHeight={{ xs: "24px", sm: "28px" }}
				>
					{title}
				</Typography>
				<Typography
					color="#1B1C20"
					fontSize={{ xs: "14px", sm: "16px" }}
					fontWeight="400"
					lineHeight={{ xs: "20px", sm: "26px" }}
				>
					{description}
				</Typography>
			</Box>
		</Box>
	)
}

export default ProcessPanel
