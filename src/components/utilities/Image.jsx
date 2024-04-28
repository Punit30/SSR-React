import { Box } from "@mui/material"
import React from "react"

function Image(props) {
	return (
		<Box
			maxWidth={props.width}
			maxHeight={props.height}
			overflow="hidden"
			width="100%"
			height="100%"
			{...props.boxProps}
		>
			<img src={props.src} width="100%" height="100%" {...props.imgProps} />
		</Box>
	)
}

Image.defaultProps = {
	width: "100%",
	height: "100%",
	boxProps: {},
	imgProps: {},
}

export default Image
