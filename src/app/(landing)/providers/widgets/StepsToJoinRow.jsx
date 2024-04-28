import Image from "@/components/utilities/Image"
import { Box, Typography } from "@mui/material"
import React from "react"


function StepsToJoinRow({ img, rowType, number, title, description }) {
	return (
		<Box
			className="f g24 align-center justify-s-b w100"
			flexDirection={{ xs: "column", md: rowType == "reverse" ? "row-reverse" : "row" }}
		>
			<Box className="f f-c" maxWidth="465px">
				<Typography
					fontFamily="Poppins"
					fontWeight="600"
					fontSize={{ xs: "48px", sm: "54px", md: "80px" }}
					lineHeight={{ xs: "72px", sm: "98px", md: "120px" }}
					color="#814cd6"
				>
					{number}
				</Typography>
				<Box className="f f-c" gap={{ xs: "0px", sm: "8px", md: "16px" }}>
					<Typography
						color="#000"
						fontFamily="Poppins"
						fontSize={{ xs: "20px", sm: "25px", md: "32px" }}
						fontWeight="600"
						lineHeight={{ xs: "30px", sm: "35px", md: "44px" }}
					>
						{title}
					</Typography>
					<Typography color="#717385" fontSize="18px" fontWeight="400" lineHeight="30px">
						{description}
					</Typography>
				</Box>
			</Box>
			<Image
				src={img}
				width="507px"
				height="305px"
				imgProps={{
					width: "auto",
					height: "auto",
					style: { maxWidth: "640px", width: "80%", maxHeight: "320px" },
				}}
				boxProps={{
					className: "f w100",
					justifyContent: { xs: "center", md: rowType === "reverse" ? "start" : "end" },
				}}
			/>
		</Box>
	)
}

export default StepsToJoinRow
