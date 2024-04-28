import { Box, CssBaseline, InputAdornment, TextField, Typography } from "@mui/material"
import _ from "lodash"
import React, { useEffect, useState } from "react"
import { FiFilter, FiSearch } from "react-icons/fi"
import { FORMAT_LIST } from "../../../Constants/data-types/cme-formats"
import useCreditType from "../../../helpers/hooks/useCreditType"
import FilterDropDown from "../../utilities/FilterDropDown"
import CMECoursesList from "./CMECoursesList"
import SuggestedCourse from "./SuggestedCourse"

function CMELibrary() {
	const [sugOpen, setSugOpen] = useState(true)
	const [creditTypeFilter, setCreditTypeFilter] = useState([])
	const [formatFilter, setFormatFilter] = useState([])
	const [creditFilter, setCreditFilter] = useState([])
	const [searchValue, setSearchValue] = useState("")

	const { data: cTData, loading: cTLoading } = useCreditType()

	useEffect(() => {
		if (
			creditFilter.length !== 0 &&
			formatFilter.length !== 0 &&
			creditTypeFilter.length !== 0 &&
			searchValue.length !== 0
		) {
			setSugOpen(false)
		}
	}, [creditFilter, creditTypeFilter, formatFilter, searchValue])

	return (
		<Box className="f f-c g16">
			<CssBaseline />
			<Box className="f flex-wrap g12 justify-s-b align-center">
				<Box className="f g6 flex-wrap" width={{ xs: "100%", sm: "fit-content" }}>
					<Box className="f align-center g6">
						<FiFilter size="16px" color="#717385" />
						<Typography color="#717385" fontSize="12px" fontWeight="500" lineHeight="18px">
							Filters
						</Typography>
					</Box>
					<FilterDropDown
						title="Credits"
						state={creditFilter}
						setState={setCreditFilter}
						dropdownList={["0", "0.25", "0.50", "0.75", "1", "1.25", "1.50", "2", "2.25", "2.50"]}
					/>
					<FilterDropDown
						title="Credit type"
						state={creditTypeFilter}
						setState={setCreditTypeFilter}
						loading={cTLoading}
						dropdownList={_.map(cTData, "name")}
					/>
					<FilterDropDown
						title="Format description"
						state={formatFilter}
						setState={setFormatFilter}
						dropdownList={Object.keys(FORMAT_LIST)}
					/>
				</Box>
				<Box className="f g8 align-center w100" maxWidth={{ xs: "none", sm: "265px" }}>
					<TextField
						fullWidth
						type="text"
						placeholder="Search by topics"
						variant="outlined"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<FiSearch color="#9a9cb0" size="16px" />
								</InputAdornment>
							),
						}}
					/>
				</Box>
			</Box>
			<SuggestedCourse open={sugOpen} setOpen={() => setSugOpen(!sugOpen)} />
			<CMECoursesList
				formatFilter={formatFilter}
				creditFilter={creditFilter}
				searchValue={searchValue}
				creditTypeFilter={creditTypeFilter}
			/>
		</Box>
	)
}

export default CMELibrary
