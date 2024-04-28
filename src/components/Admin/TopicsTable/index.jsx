import { useLazyQuery, useMutation } from "@apollo/client"
import { Box, CssBaseline, IconButton, InputAdornment, TextField } from "@mui/material"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi"
import { dltTopicMutation } from "../../../gql/mutations/Topic"
import { getTopicListQuery } from "../../../gql/queries/Topic"
import Delete from "../../common/Modals/Delete"
import TopicListLayout from "./List"
import AddEditModal from "./Modal/AddEdit"
import Button from "../../utilities/Button"
import { TrackForm } from "../../../app/GlobalObjects/store/actions/TrackForm"
import useTopics from "../../../helpers/hooks/useTopics"

function TopicsTable() {
	const [searchValue, setSearchValue] = useState("")
	const [addModalOpen, setAddModalOpen] = useState(false)
	const [isEditForm, setIsEditForm] = useState(false)
	const [deleteModal, setDeleteModal] = useState(false)
	const [selectedTopic, setSelectedTopic] = useState(false)
	const { enqueueSnackbar } = useSnackbar()

	const { data, loading, fetchData } = useTopics()
	const [DltTopic, { loading: dltLoading }] = useMutation(dltTopicMutation)

	const filteredList =
		data.length !== 0 ? _.filter(data, (item) => item.name.toLowerCase().includes(searchValue.toLowerCase())) : []

	const handleDelete = (item) => {
		setSelectedTopic(item)
		setDeleteModal(true)
	}

	const Actions = (item) => (
		<Box className="f g2">
			<IconButton
				sx={{ padding: "6px" }}
				onClick={() => {
					setIsEditForm(true)
					setSelectedTopic(item)
					setAddModalOpen(true)
				}}
			>
				<FiEdit2 size="16px" color="#B1B3C4" />
			</IconButton>
			<IconButton sx={{ padding: "6px" }} onClick={() => handleDelete(item)}>
				<FiTrash2 size="16px" color="#B1B3C4" />
			</IconButton>
		</Box>
	)

	const handleDltFunc = async () => {
		try {
			await DltTopic({ variables: { topicId: selectedTopic.id } })
			fetchData()
			setSelectedTopic(null)
			setDeleteModal(false)
			enqueueSnackbar("Topic deleted successfully.", { variant: "mui-alert", color: "success" })
			TrackForm({ formId: "topic_delete", variant: "success" })
		} catch (e) {
			TrackForm({ formId: "topic_delete", variant: "danger" })
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	return (
		<>
			<AddEditModal
				open={addModalOpen}
				selectedTopic={selectedTopic}
				handleClose={() => {
					setAddModalOpen(false)
					setIsEditForm(false)
					setSelectedTopic(null)
				}}
				refreshData={fetchData}
				isEdit={isEditForm}
			/>
			<Delete
				title="Delete topic?"
				open={deleteModal}
				isSubmitting={dltLoading}
				handleClose={() => setDeleteModal(false)}
				handleSubmit={handleDltFunc}
			/>
			<CssBaseline />
			<Box className="f f-c" gap={{ xs: "16px", md: "24px" }}>
				<Box className="f flex-wrap g12 justify-s-b align-center">
					<Box minWidth="302px" maxWidth={{ xs: "none", sm: "360px" }} width="100%">
						<TextField
							fullWidth
							type="text"
							placeholder="Search"
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
					<Button
						sx={{ padding: "10px 16px", fontSize: "14px" }}
						variant="contained"
						color="purple"
						onClick={() => setAddModalOpen(true)}
					>
						<FiPlus size="16px" /> Add Topic
					</Button>
				</Box>

				<TopicListLayout
					title="Topic"
					noDataText="No Topic available"
					loading={loading}
					listItems={filteredList}
					actions={Actions}
				/>
			</Box>
		</>
	)
}

export default TopicsTable
