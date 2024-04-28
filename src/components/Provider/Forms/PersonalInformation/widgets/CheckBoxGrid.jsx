import { Box, Checkbox, Typography } from "@mui/material"
import _ from "lodash"
import React from "react"

const CheckBoxGrid = ({ icon, checkedIcon, state, setState, data }) => (
	<Box className="f g12 justify-s-b" maxWidth="540px">
		{_.chunk(data, Math.ceil(data.length / 2)).map((chunk, index) => (
			<Box className="f f-c g4 w100" key={index}>
				{_.map(chunk, (chunkItem, idx) => (
					<Box className="f align-start g6" key={idx}>
						<Checkbox
							{...(icon ? { icon } : {})}
							{...(checkedIcon ? { checkedIcon } : {})}
							value={chunkItem}
							checked={state.includes(chunkItem)}
							onChange={() => setState(chunkItem)}
						/>
						<Typography
							className="f align-center h100"
							color="#1B1C20"
							fontSize="14px"
							fontWeight="400"
							lineHeight="20px"
						>
							{chunkItem}
						</Typography>
					</Box>
				))}
			</Box>
		))}
	</Box>
)

export default CheckBoxGrid
