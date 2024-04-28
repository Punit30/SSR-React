import { Box, CssBaseline, Typography } from "@mui/material"
import _ from "lodash"
import React from "react"
import Course from "./Course"

function Group({ data }) {
	return (
		<>
			<CssBaseline />
			<Box className="f f-c b-r16 g16" sx={{ border: "1px solid #EAEBF2", backgroundColor: "#FFF" }}>
				<Box className="f g12" padding={{ xs: "12px 16px", sm: "12px 24px" }} borderBottom="1px solid #EAEBF2">
					<Typography
						color="#1B1C20"
						fontSize="14px"
						fontWeight="600"
						lineHeight="20px"
						textTransform="capitalize"
					>
						{data.title}
					</Typography>
				</Box>
				<Box className="f f-c g12" paddingBottom="20px">
					{data.cmeCourses.length !== 0 ? (
						_.map(data.cmeCourses, (cmeCourse, index) => <Course cmeCourse={cmeCourse} key={index} />)
					) : (
						<Typography
							className="f align-center justify-center w100 h100"
							fontWeight="500"
							fontSize="14px"
							lineHeight="20px"
							color="#b1b3c4"
							minHeight="80px"
						>
							No course available
						</Typography>
					)}
				</Box>
			</Box>
		</>
	)
}

export default Group
