import { useLazyQuery } from "@apollo/client"
import { Box, Skeleton, Typography } from "@mui/material"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { FiBookOpen } from "react-icons/fi"
import { connect } from "react-redux"
import { FORMAT_LIST } from "../../../../Constants/data-types/cme-formats"
import { getAllCoursesByCriteriaQuery } from "../../../../gql/queries/Course"
import IconFrame from "../../../utilities/IconFrame"
import Group from "../widgets/Group"

function CMECoursesList({ id, formatFilter, creditFilter, searchValue, creditTypeFilter }) {
	const { enqueueSnackbar } = useSnackbar()

	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [GetCourses, { called }] = useLazyQuery(getAllCoursesByCriteriaQuery, { fetchPolicy: "network-only" })

	useEffect(() => {
		const timeout = called ? 750 : 0
		const debounceFunction = setTimeout(() => {
			fetchData()
		}, timeout)

		return () => clearTimeout(debounceFunction)
	}, [searchValue, creditTypeFilter, formatFilter, creditFilter])

	const fetchData = async () => {
		setLoading(true)
		try {
			const payload = {
				providerId: id,
				cmeCourseName: searchValue,
				creditHours: _.map(creditFilter, (credit) => parseFloat(credit)),
				courseFormat: _.map(formatFilter, (format) => FORMAT_LIST[format]),
				creditType: creditTypeFilter,
			}
			const res = (await GetCourses({ variables: payload })).data.getAllCourseByCriteria.searchResult

			setData(res)
		} catch (e) {
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
		setLoading(false)
	}

	return (
		<Box className="f f-c g16">
			{loading ? (
				_.times(6, (index) => <Skeleton height="240px" sx={{ borderRadius: "12px" }} />)
			) : data.length !== 0 ? (
				_.map(data, (group, index) => <Group data={group} key={index} />)
			) : (
				<Box className="f f-c g16 b-r16 align-center justify-center" border="1px solid #d9dae6" height="300px">
					<IconFrame
						icon={<FiBookOpen />}
						iconColor="#814cd6"
						iconSize="24px"
						backgroundColor="#f2edfc"
						boxSize="72px"
					/>
					<Typography fontWeight="500" fontSize="16px" lineHeight="24px">
						{searchValue.length === 0 &&
						formatFilter.length === 0 &&
						creditFilter.length === 0 &&
						creditTypeFilter.length !== 0
							? "There are currently no files to display."
							: "There are no CMEs that match your selected filters."}
					</Typography>
				</Box>
			)}
		</Box>
	)
}

const mapStateToProps = (state) => ({
	id: state.local.providerReducer.providerId,
})

export default connect(mapStateToProps)(CMECoursesList)
