import { Box, Skeleton } from "@mui/material"
import React from "react"

function Loading() {
	return (
		<Box className="f f-c g32" maxWidth="512px">
			<Box className="f f-c g12">
				<Box className="f align-center g12">
					<Skeleton height="44px" width="44px" variant="circular" />
					<Skeleton height="32px" width="140px" />
				</Box>
				<Skeleton height="54px" />
			</Box>
			<Skeleton height="46px" />
		</Box>
	)
}

export default Loading
