import { Box, Typography } from "@mui/material"
import _ from "lodash"
import { MAPPER_STYLES } from "../meta/MetaData.jsx"

export const KeyInfoDetail = ({ icon, label, value }) => (
	<Box className="f align-center g12 justify-s-b" padding="14px 0px">
		<Box sx={MAPPER_STYLES.keyInfo.details}>
			<Typography fontSize="16px" color="#717385" lineHeight="16px">
				{icon}
			</Typography>
			<Typography sx={MAPPER_STYLES.keyInfo.text}>{label}</Typography>
		</Box>
		<Typography color="#9A9CB0" fontSize="12px" fontWeight="500" lineHeight="18px" textTransform="capitalize">
			{value}
		</Typography>
	</Box>
)

export const KeyInfoMapDetail = ({ label, data }) =>
	data.length !== 0 ? (
		<Box className="f f-c g6">
			<Typography color="#1B1C20" fontSize="12px" fontWeight="500" lineHeight="18px">
				{label}
			</Typography>
			<Box className="f flex-wrap g6">
				{_.map(data, (item, index) => (
					<Typography sx={MAPPER_STYLES.keyInfo.tags} key={index} textTransform="capitalize">
						{item.toLowerCase()}
					</Typography>
				))}
			</Box>
		</Box>
	) : null
