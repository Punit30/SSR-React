import { useLazyQuery, useMutation } from "@apollo/client"
import { useTheme } from "@emotion/react"
import { Box, CssBaseline, InputAdornment, Skeleton, TextField, Typography, useMediaQuery } from "@mui/material"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { FiPlus, FiSearch, FiShuffle } from "react-icons/fi"
import { useDispatch } from "react-redux"
import { dltCourseGroupMutation, reArrageCourseGroupsMutation } from "../../../gql/mutations/Course"
import { getAllCourseGroupsQuery } from "../../../gql/queries/Course"
import { TrackForm } from "../../../app/GlobalObjects/store/actions/TrackForm"
import Delete from "../../common/Modals/Delete"
import Button from "../../utilities/Button"
import AddEditGroup from "./Modals/AddEditGroup"
import ReArrange from "./Modals/ReArrange"
import Group from "./widgets/Group"
import { CREDIT_TYPES } from "../../../Constants/data-types/cme-formats"
import CustomSelect from "../../utilities/Select"

function CMELibraryGroupList() {
	const dispatch = useDispatch()

	const { enqueueSnackbar } = useSnackbar()
	const [groupData, setGroupData] = useState([])
	const [grpSearchValue, setGrpSearchValue] = useState("")
	const [resSearchValue, setResSearchValue] = useState("")
	const [resCreditType, setResCreditType] = useState(null)
	const [reArrangeModal, setReArrangeModal] = useState(false)
	const [addEditGroupModal, setAddEditGroupModal] = useState(false)
	const [selectedGroup, setSelectedGroup] = useState(null)
	const [dltModal, setDltModal] = useState(false)

	const [GetAllCourseGroups, { loading }] = useLazyQuery(getAllCourseGroupsQuery, { fetchPolicy: "network-only" })
	const [DltCourseGroup, { loading: dltLoading }] = useMutation(dltCourseGroupMutation)
	const [ReArrangeCourseGroups, { loading: reArrangeLoading }] = useMutation(reArrageCourseGroupsMutation)

	useEffect(() => {
		getGroups()
	}, [])

	const getGroups = async () => {
		try {
			let res = (await GetAllCourseGroups()).data.getAllCMECourseByGroup
			setGroupData(res)
			dispatch(res)
		} catch (e) {
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	const filteredGroups = _.chain(groupData)
		.filter((group) => _.includes(_.toLower(group.title), _.toLower(grpSearchValue)))
		.map((group) => ({
			...group,
			cmeCourses: _.filter(group.cmeCourses, (course) =>
				_.includes(_.toLower(course.title), _.toLower(resSearchValue)) &&
				_.includes(_.toLower(course.creditType), _.toLower(resCreditType))
			),
		}))
		.value()

	const handleReArrange = async (values) => {
		try {
			const orderList = _.map(values, (item, index) => ({
				id: item.id,
				order: index + 1,
			}))

			await ReArrangeCourseGroups({ variables: { orderList } })
			getGroups()
			setReArrangeModal(false)
			enqueueSnackbar("Course group re-arranged successfully.", { variant: "mui-alert", color: "success" })
			TrackForm({ formId: "course_group_rearrange", variant: "success" })
		} catch (e) {
			TrackForm({ formId: "course_group_rearrange", variant: "danger" })
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	const handleDltFunc = async () => {
		try {
			await DltCourseGroup({ variables: { cmeCourseGroupId: selectedGroup.id } })
			getGroups()
			setSelectedGroup(null)
			setDltModal(false)
			enqueueSnackbar("Course group deleted successfully.", { variant: "mui-alert", color: "success" })
			TrackForm({ formId: "course_group_delete", variant: "success" })
		} catch (e) {
			TrackForm({ formId: "course_group_delete", variant: "danger" })
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	return (
		<>
			<CssBaseline />
			<AddEditGroup
				open={addEditGroupModal}
				selectedGrp={selectedGroup}
				handleClose={() => {
					setAddEditGroupModal(false)
					setSelectedGroup(null)
				}}
				refreshData={getGroups}
				isEdit={selectedGroup !== null}
			/>
			<ReArrange
				open={reArrangeModal}
				loading={reArrangeLoading}
				list={_.map(groupData, (group) => ({ id: group.id, title: group.title }))}
				handleSubmit={handleReArrange}
				handleClose={() => setReArrangeModal(false)}
			/>
			<Delete
				title="Delete group?"
				open={dltModal}
				isSubmitting={dltLoading}
				handleClose={() => {
					setDltModal(false)
					setSelectedGroup(null)
				}}
				handleSubmit={handleDltFunc}
			/>
			<Box className="f f-c" gap={{ xs: "16px", md: "24px" }}>
				<Box className="f flex-wrap g12 justify-s-b align-center">
					<Box className="f g6 flex-wrap" width={{ xs: "100%", sm: "fit-content" }}>
						<Box minWidth="198px" maxWidth={{ xs: "none", sm: "198px" }} width="100%">
							<TextField
								fullWidth
								type="text"
								placeholder="Search by group"
								variant="outlined"
								value={grpSearchValue}
								onChange={(e) => setGrpSearchValue(e.target.value)}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<FiSearch color="#9a9cb0" />
										</InputAdornment>
									),
								}}
							/>
						</Box>
						<Box minWidth="198px" maxWidth={{ xs: "none", sm: "198px" }} width="100%">
							<TextField
								fullWidth
								type="text"
								placeholder="Search by CME"
								variant="outlined"
								value={resSearchValue}
								onChange={(e) => setResSearchValue(e.target.value)}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<FiSearch color="#9a9cb0" />
										</InputAdornment>
									),
								}}
							/>
						</Box>
						<Box minWidth="260px" maxWidth={{ xs: "none", sm: "198px" }} width="100%">
							<CustomSelect
							isClearable
								options={CREDIT_TYPES}
								value={ resCreditType ?{
									value: resCreditType,
									label: resCreditType.charAt(0) + resCreditType.slice(1).toLowerCase(),
								} : null}
								placeholder="Credit type"
								onChange={(value) => setResCreditType(value?.value)}
							/>
						</Box>
					</Box>
					<Box className="f g8 align-center">
						<Button
							sx={{ padding: "10px 16px", fontSize: "14px", gap: "6px", lineHeight: 1.5 }}
							variant="contained"
							color="purple"
							onClick={() => setReArrangeModal(true)}
							disabled={loading || groupData.length === 0}
						>
							<FiShuffle size="16px" /> Re-arrange
						</Button>
						<Button
							sx={{ padding: "10px 16px", fontSize: "14px", gap: "6px", lineHeight: 1.5 }}
							variant="contained"
							color="purple"
							onClick={() => setAddEditGroupModal(true)}
						>
							<FiPlus size="16px" /> Add group
						</Button>
					</Box>
				</Box>
				<Box
					className="f f-c g16"
					// sx={{ overflowY: "auto", scrollbarWidth: "none" }}
					// height={{ xs: "540px", md: `calc(var(--window-height) - ${isMD ? "270px" : "320px"})` }}
				>
					{loading ? (
						_.times(10, (index) => <Skeleton key={index} height="480px" sx={{ minHeight: "480px" }} />)
					) : filteredGroups.length !== 0 ? (
						_.map(filteredGroups, (group, index) => (
							<Group
								key={index}
								data={group}
								handleEdit={(value) => {
									setSelectedGroup(value)
									setAddEditGroupModal(true)
								}}
								handleDlt={(value) => {
									setSelectedGroup(value)
									setDltModal(true)
								}}
								refreshData={getGroups}
							/>
						))
					) : (
						<Typography
							className="f align-center justify-center w100 h100 b-r12"
							border="1px solid #d9dae6"
							fontWeight="500"
							fontSize="14px"
							lineHeight="20px"
							color="#b1b3c4"
							minHeight="200px"
						>
							No course group available
						</Typography>
					)}
				</Box>
			</Box>
		</>
	)
}

export default CMELibraryGroupList
