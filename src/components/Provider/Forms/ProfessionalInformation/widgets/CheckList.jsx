import { Box, Chip } from "@mui/material"
import _ from "lodash"
import React from "react"

function CheckList({ data, state, setState = () => {} }) {
	return (
		<Box className="f align-center g8 flex-wrap">
			{_.map(data, (item) => (
				<Chip
					key={item}
					label={item}
					variant={state.includes(item) ? "filled" : "outlined"}
					onClick={() => setState(item)}
				/>
			))}
		</Box>
	)
}

export default CheckList
