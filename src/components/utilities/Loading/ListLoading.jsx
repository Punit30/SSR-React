import { Box, Skeleton } from "@mui/material"
import React from "react"

function ListLoading(props) {
	return (
		<Box className="f f-c g8" padding={props.padding}>
			<Skeleton height={38} />
			<Skeleton height={38} />
			<Skeleton height={38} />
			<Skeleton height={38} />
			<Skeleton height={38} />
			<Skeleton height={38} />
			<Skeleton height={38} />
			<Skeleton height={38} />
			<Skeleton height={38} />
			<Skeleton height={38} />
			<Skeleton height={38} />
			<Skeleton height={38} />
			<Skeleton height={38} />
			<Skeleton height={38} />
			<Skeleton height={38} />
		</Box>
	)
}

ListLoading.defaultProps = {
	padding: "0px 16px",
}

export default ListLoading
