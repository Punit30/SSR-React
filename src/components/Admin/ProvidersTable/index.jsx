import { useLazyQuery } from "@apollo/client"
import { CssBaseline, Skeleton, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/styles"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { getAllProviderQuery } from "../../../gql/queries/Providers"
import CMETagFormat from "../../../helpers/TableRenderFormats/CMETagFormat"
import NameMailFormat from "../../../helpers/TableRenderFormats/NameMailFormat"
import { DirectoryStatusFormat, ProfileStatusFormat } from "../../../helpers/TableRenderFormats/StatusFormat"
import DataTable from "../../utilities/DataTables"
import ActionBtn from "./ActionBtn"

function ProvidersTable(props) {
	const theme = useTheme()
	const { enqueueSnackbar } = useSnackbar()
	const isMD = useMediaQuery(theme.breakpoints.up("md"))
	const [providersData, setProvidersData] = useState([])

	const [GetAllProviders, { loading }] = useLazyQuery(getAllProviderQuery, { fetchPolicy: "network-only" })

	useEffect(() => {
		getData()
	}, [])

	const getData = async () => {
		try {
			const res = await GetAllProviders()
			const providerData = _.map(res.data.getAllProvider, (item) => ({
				id: item.id,
				email: item.email,
				isVetted: item.isVetted,
				name: `${item.firstName} ${item.lastName}`,
				organizationName: _.get(item, "organisation.name", "-"),
				degree: _.get(item, "primaryDegree[0].degreeType", "-"),
				status: item.status,
				profileCompleted: item.hasCompletedSurvey ? "Yes" : "No",
				suggestedCMEs: _.get(item, "suggestedResourceDetail.total", 0),
				suggestedCMECompleted: _.get(item, "suggestedResourceDetail.completed", 0),
			}))
			setProvidersData(providerData)
		} catch (e) {
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	const COLUMNS = [
		{
			headerName: "Name",
			field: "name",
			flex: 1,
			minWidth: 340,
			cellRenderer: NameMailFormat,
		},
		{
			headerName: "Email",
			field: "email",
			flex: 1,
			minWidth: 340,
			hide: true,
		},
		{
			headerName: "Degree",
			field: "degree",
			flex: 2,
			minWidth: 120,
		},
		{
			headerName: "Organization Name",
			field: "organizationName",
			flex: 2,
			minWidth: 200,
		},
		{
			headerName: "Suggested CMEs Completed",
			field: "suggestedCMECompleted",
			flex: 1,
			minWidth: 160,
			hide: true,
		},
		{
			headerName: "CME status",
			field: "suggestedCMECompleted",
			flex: 1,
			minWidth: 160,
			cellRenderer: CMETagFormat,
		},
		{
			headerName: "Suggested CMEs",
			field: "suggestedCMEs",
			flex: 1,
			minWidth: 160,
			hide: true,
		},
		{
			headerName: "Is vetted",
			field: "isVetted",
			flex: 1,
			minWidth: 160,
			hide: true,
		},
		{
			headerName: "Directory status",
			field: "status",
			flex: 2,
			minWidth: 200,
			cellRenderer: DirectoryStatusFormat,
		},
		{
			headerName: "Profile Completed",
			field: "profileCompleted",
			flex: 2,
			minWidth: 200,
			cellRenderer: ProfileStatusFormat,
		},
		{
			headerName: "Actions",
			field: "actions",
			flex: 2,
			minWidth: 160,
			cellRenderer: ActionBtn,
			cellRendererParams: {
				getData: getData,
			},
		},
	]

	const onGridReady = (params) => {
		params.api.setGridOption("includeHiddenColumnsInQuickFilter", true)
		props.setGridApi(params.api)
		props.setCanSearch(true)
	}

	return (
		<>
			<CssBaseline />
			{loading ? (
				<Skeleton height={`calc(var(--window-height) - ${isMD ? "210px" : "260px"})`} />
			) : (
				<DataTable
					containerHeight={isMD ? "65vh" : "58vh"}
					rowData={providersData}
					columnDefs={COLUMNS}
					onGridReady={onGridReady}
					rowHeight={72}
					pagination={1} //true
					pageSize={50}
					onFilterChange={props.handleColumnFilterChange}
				/>
			)}
		</>
	)
}

export default ProvidersTable
