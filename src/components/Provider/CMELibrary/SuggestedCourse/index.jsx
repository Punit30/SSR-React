import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Skeleton, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { FiChevronDown } from "react-icons/fi"
import { connect } from "react-redux"
import { getCMECourseBySuggestionQuery } from "../../../../gql/queries/Course"
import { useLazyQuery } from "@apollo/client"
import { useSnackbar } from "notistack"
import _ from "lodash"
import Course from "../widgets/Course"

function SuggestedCourse({ id, open, setOpen }) {
	const { enqueueSnackbar } = useSnackbar()
	const [data, setData] = useState({})
	const [GetSuggestedCourses, { loading }] = useLazyQuery(getCMECourseBySuggestionQuery, {
		fetchPolicy: "network-only",
	})

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			let res = (await GetSuggestedCourses({ variables: { providerId: Number(id) } })).data
				.getCMECourseSuggestions

			setData(res)
		} catch (e) {
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	return (
		<Box>
			<Accordion sx={{ overflow: "hidden" }} expanded={open} onChange={setOpen}>
				<AccordionSummary
					expandIcon={<FiChevronDown color="#814CD6" />}
					sx={{ backgroundColor: "#F2EDFC", color: "#814CD6" }}
					aria-controls="panel1-content"
					id="panel1-header"
				>
					Personalized CME recommendations
				</AccordionSummary>
				<Divider />
				<AccordionDetails>
					<Box className="f f-c g12" padding="12px 0px 20px">
						{loading ? (
							<Box className="f f-c g8" padding="0px 12px">
								{_.times(4, (index) => (
									<Skeleton height="80px" key={index} />
								))}
							</Box>
						) : data?.suggestedCMECourses?.length !== 0 ? (
							_.map(data?.suggestedCMECourses, (course, index) => (
								<Course cmeCourse={course} key={index} />
							))
						) : (
							<Typography
								className="f align-center justify-center w100 h100"
								fontWeight="500"
								fontSize="14px"
								lineHeight="20px"
								color="#b1b3c4"
								minHeight="120px"
							>
								No suggested course available
							</Typography>
						)}
					</Box>
				</AccordionDetails>
			</Accordion>
		</Box>
	)
}

const mapStateToProps = (state) => ({
	id: state.local.providerReducer.providerId,
})

export default connect(mapStateToProps)(SuggestedCourse)
