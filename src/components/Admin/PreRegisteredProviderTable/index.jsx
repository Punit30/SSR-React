import { useLazyQuery } from "@apollo/client"
import { CssBaseline, Skeleton, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/styles"
import _ from "lodash"
import moment from "moment"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { getPreRegisteredProvidersQuery } from "../../../gql/queries/Providers"
import NameMailFormat from "../../../helpers/TableRenderFormats/NameMailFormat"
import { ListFormat } from "../../../helpers/TableRenderFormats/StatusFormat"
import DataTable from "../../utilities/DataTables"

function PreRegisteredProviderTable(props) {
	const theme = useTheme()
	const { enqueueSnackbar } = useSnackbar()
	const isMD = useMediaQuery(theme.breakpoints.up("md"))
	const [providersData, setProvidersData] = useState([])

	const [GetPreRegisteredProvider, { loading }] = useLazyQuery(getPreRegisteredProvidersQuery, {
		fetchPolicy: "network-only",
	})

	useEffect(() => {
		getData()
	}, [])

	const getData = async () => {
		try {
			const res = await GetPreRegisteredProvider()
			const providerData = _.map(res.data.getPreRegisteredProviders, (item) => ({
				id: item.id,
				email: item.email,
				name: `${item.firstName} ${item.lastName}`,
				message: item.message,
				state: item.state,
				licenseType: item.licenseType,
				dateEntered: moment(moment(item.creationDate).format("L")).format("DD-MM-YY"),
			}))
			setProvidersData(_.reverse(providerData))
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
			headerName: "Date entered",
			field: "dateEntered",
			flex: 2,
			minWidth: 160,
		},
		{
			headerName: "State",
			field: "state",
			flex: 2,
			minWidth: 240,
			autoHeight: true,
			cellRenderer: ListFormat,
		},
		{
			headerName: "Licence type",
			field: "licenseType",
			flex: 2,
			minWidth: 240,
			autoHeight: true,
			cellRenderer: ListFormat,
		},
		{
			headerName: "Message",
			field: "message",
			flex: 2,
			wrapText: true,
			autoHeight: true,
			minWidth: 240,
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

export default PreRegisteredProviderTable
