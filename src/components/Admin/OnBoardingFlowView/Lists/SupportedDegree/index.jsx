import { useMutation } from "@apollo/client"
import { Box, CssBaseline, IconButton } from "@mui/material"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useState } from "react"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import { dltDegreeMutation } from "../../../../../gql/mutations/Degree"
import useDegree from "../../../../../helpers/hooks/useDegree"
import { TrackForm } from "../../../../../app/GlobalObjects/store/actions/TrackForm"
import Delete from "../../../../common/Modals/Delete"
import ListLayout from "../ListLayout"
import AddEditModal from "./Modal/AddEdit"

function SupportedDegreeList(props) {
	const [addModalOpen, setAddModalOpen] = useState(false)
	const [isEditForm, setIsEditForm] = useState(false)
	const [deleteModal, setDeleteModal] = useState(false)
	const [selectedDegree, setSelectedDegree] = useState(false)
	const { enqueueSnackbar } = useSnackbar()

	const {data, loading, fetchData} = useDegree()
	const [DltDegree, { loading: dltLoading }] = useMutation(dltDegreeMutation)

	const searchValue = props.searchValue.toLowerCase()
	const filteredList =
		data.length !== 0 ? _.filter(data, (item) => item.name.toLowerCase().includes(searchValue)) : []

	const handleDelete = (item) => {
		setSelectedDegree(item)
		setDeleteModal(true)
	}

	const Actions = (item) => (
		<Box className="f g2">
			<IconButton
				sx={{ padding: "6px" }}
				onClick={() => {
					setIsEditForm(true)
					setSelectedDegree(item)
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
			await DltDegree({ variables: { degreeId: selectedDegree.id } })
			fetchData()
			setSelectedDegree(null)
            setDeleteModal(false)
			enqueueSnackbar("Degree deleted successfully.", { variant: "mui-alert", color: "success" })
			TrackForm({ formId: "onboard_degree_delete", variant: "success" })
		} catch (e) {
			TrackForm({ formId: "onboard_degree_delete", variant: "danger" })
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	return (
		<>
			<CssBaseline />
			<AddEditModal
				open={addModalOpen}
				selectedDegree={selectedDegree}
				handleClose={() => {
					setAddModalOpen(false)
					setIsEditForm(false)
					setSelectedDegree(null)
				}}
				refreshData={fetchData}
				isEdit={isEditForm}
			/>
			<Delete
				title="Delete degree?"
				open={deleteModal}
				isSubmitting={dltLoading}
				handleClose={() => setDeleteModal(false)}
				handleSubmit={handleDltFunc}
			/>
			<ListLayout
				title="Supported Degree"
				noDataText="No degree available"
				loading={loading}
				listItems={filteredList}
				actions={Actions}
				addModalClick={() => setAddModalOpen(true)}
			/>
		</>
	)
}

export default SupportedDegreeList
