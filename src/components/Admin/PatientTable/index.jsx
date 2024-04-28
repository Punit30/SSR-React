import { useLazyQuery } from "@apollo/client"
import { Box, Divider, InputAdornment, Skeleton, TextField, Typography, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/styles"
import _ from "lodash"
import moment from "moment"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { FiSearch, FiUpload } from "react-icons/fi"
import { getPreRegisteredPatientsQuery } from "../../../gql/queries/Patients"
import { dataTableAllFilterClear, dataTableExport, dataTableSearch } from "../../../helpers/DataTableFunc"
import Button from "../../utilities/Button"
import DataTable from "../../utilities/DataTables"

const COLUMNS = [
	{
		headerName: "Email",
		field: "email",
		flex: 1,
		minWidth: 340,
	},
	{
		headerName: "Date entered",
		field: "dateEntered",
		flex: 2,
		minWidth: 240,
	},
	{
		headerName: "Zip code",
		field: "zipCode",
		flex: 2,
		minWidth: 240,
	},
]

function AdminPatientTable() {
	const theme = useTheme()
	const { enqueueSnackbar } = useSnackbar()
	const isMD = useMediaQuery(theme.breakpoints.up("md"))
	const [patientsData, setPatientsData] = useState([])
	const [totalSignupLM, setTotalSignupLM] = useState(0)
	const [gridApi, setGridApi] = useState()
	const [isFiltered, setIsFiltered] = useState(false)

	const [GetPatient, { loading }] = useLazyQuery(getPreRegisteredPatientsQuery)

	useEffect(() => {
		getData()
	}, [])

	const getData = async () => {
		try {
			const res = await GetPatient()

			const preRegisteredPatients = res.data.getPreRegisteredPatients || []

			let count = 0
			const data = _.reverse(
				preRegisteredPatients.map((item) => {
					const date = item.creationDate ? moment(new Date(item.creationDate)) : null
					if (date && date.isSame(moment().subtract(1, "month"), "month")) {
						count++
					}

					return {
						id: item.id,
						email: item.email,
						dateEntered: date ? moment(date.format("L")).format("DD-MM-YY") : "",
						zipCode: item.zipCode || "",
					}
				})
			)

			setTotalSignupLM(count)
			setPatientsData(data)
		} catch (error) {
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	const onGridReady = (params) => {
		params.api.setGridOption("includeHiddenColumnsInQuickFilter", true)
		setGridApi(params.api)
	}

	const handleColumnFilterChange = (e) => {
		if (Object.keys(gridApi.getFilterModel()).length !== 0) {
			setIsFiltered(true)
		} else {
			setIsFiltered(false)
		}
	}

	return (
		<Box className="f f-c" gap={{ xs: "16px", md: "24px" }} padding={{ xs: "16px", sm: "32px 24px" }}>
			<Box className="f g12 align-center justify-s-b flex-wrap">
				<Typography
					color="#101828"
					fontFamily="Poppins"
					fontSize={{ xs: "24px", md: "28px" }}
					fontWeight="500"
					lineHeight={{ xs: "33px", md: "36px" }}
				>
					View all patients
				</Typography>
				<Button
					variant="contained"
					color="purple"
					sx={{ padding: "10px 16px" }}
					onClick={() => dataTableExport(gridApi)}
				>
					<Typography
						className="f align-center g6"
						color="#FFF"
						fontSize="14px"
						fontWeight={500}
						lineHeight="20px"
					>
						<FiUpload size="16px" /> Export to xls/csv
					</Typography>
				</Button>
			</Box>
			<Divider sx={{ display: { xs: "block", sm: "none" } }} />
			{loading ? (
				<Box className="f f-c" gap={{ xs: "16px", md: "24px" }}>
					<Skeleton height="48px" />
					<Skeleton height={`calc(var(--window-height) - ${isMD ? "210px" : "260px"})`} />
				</Box>
			) : (
				<>
					<Box className="f g12 align-center justify-s-b flex-wrap">
						<Box minWidth="302px" maxWidth={{ xs: "none", sm: "302px" }} width="100%">
							<TextField
								fullWidth
								type="text"
								placeholder="Search"
								variant="outlined"
								onChange={(e) => dataTableSearch(gridApi, e.target.value)}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<FiSearch color="#9a9cb0" />
										</InputAdornment>
									),
								}}
							/>
						</Box>
						<Box
							className="f g12 align-center justify-s-b"
							flexDirection={{ xs: "row", sm: "row-reverse" }}
							flex={1}
							flexBasis="300px"
						>
							<Typography
								className="f align-center justify-center"
								color="#814CD6"
								textAlign="center"
								fontSize="14px"
								fontWeight="500"
								lineHeight="20px"
								sx={{
									padding: "4px 10px",
									borderRadius: "16px",
									background: "#F2EDFC",
								}}
							>
								Total signups (last month): {totalSignupLM}
							</Typography>
							{isFiltered ? (
								<Button
									variant="text"
									color="purple"
									onClick={() => dataTableAllFilterClear(gridApi)}
									sx={{ fontSize: "14px" }}
								>
									Clear filter
								</Button>
							) : null}
						</Box>
					</Box>
					<DataTable
						containerHeight={isMD ? "65vh" : "58vh"}
						rowData={patientsData}
						columnDefs={COLUMNS}
						onGridReady={onGridReady}
						rowHeight={72}
						pagination={1} //true
						pageSize={50}
						onFilterChange={handleColumnFilterChange}
					/>
				</>
			)}
		</Box>
	)
}

export default AdminPatientTable
