import { Box, Grid, InputAdornment, TextField } from "@mui/material"
import React, { useState } from "react"
import { FiSearch } from "react-icons/fi"
import OrganizationList from "./Lists/Organization"
import SupportedDegreeList from "./Lists/SupportedDegree"
import SupportedSpecialtyList from "./Lists/SupportedSpecialty"

function OnBoardingFlowView() {
	const [searchValue, setSearchValue] = useState("")

	return (
		<>
			<Box minWidth="302px" maxWidth={{ xs: "none", sm: "360px" }} width="100%">
				<TextField
					fullWidth
					type="text"
					placeholder="Search for specialty, degree or organization"
					variant="outlined"
					onChange={(e) => setSearchValue(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<FiSearch color="#9a9cb0" />
							</InputAdornment>
						),
					}}
				/>
			</Box>
			<Grid container columns={12} columnSpacing="16px" rowSpacing="16px">
				<Grid item xs={12} sm={6} md={4}>
					<OrganizationList searchValue={searchValue} />
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<SupportedDegreeList searchValue={searchValue} />
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<SupportedSpecialtyList searchValue={searchValue} />
				</Grid>
			</Grid>
		</>
	)
}

export default OnBoardingFlowView
