import { useMutation } from "@apollo/client"
import { Box, CssBaseline, IconButton } from "@mui/material"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useState } from "react"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import { dltSpecialtyMutation } from "../../../../../gql/mutations/Specialty"
import useSpecialty from "../../../../../helpers/hooks/useSpecialty"
import { TrackForm } from "../../../../../app/GlobalObjects/store/actions/TrackForm"
import Delete from "../../../../common/Modals/Delete"
import ListLayout from "../ListLayout"
import AddEditModal from "./Modal/AddEdit"

function SupportedSpecialtyList(props) {
	const [addModalOpen, setAddModalOpen] = useState(false)
	const [isEditForm, setIsEditForm] = useState(false)
	const [deleteModal, setDeleteModal] = useState(false)
	const [selectedSpecialty, setSelectedSpecialty] = useState(false)
	const { enqueueSnackbar } = useSnackbar()

	const { data, loading, fetchData } = useSpecialty()
	const [DltSpecialty, { loading: dltLoading }] = useMutation(dltSpecialtyMutation)

	const searchValue = props.searchValue.toLowerCase()
	const filteredList =
		data.length !== 0 ? _.filter(data, (item) => item.name.toLowerCase().includes(searchValue)) : []

	const handleDelete = (item) => {
		setSelectedSpecialty(item)
		setDeleteModal(true)
	}

	const Actions = (item) => (
		<Box className="f g2">
			<IconButton
				sx={{ padding: "6px" }}
				onClick={() => {
					setIsEditForm(true)
					setSelectedSpecialty(item)
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
			await DltSpecialty({ variables: { name: selectedSpecialty } })
			fetchData()
			setSelectedSpecialty(null)
			setDeleteModal(false)
			enqueueSnackbar("Specialty deleted successfully.", { variant: "mui-alert", color: "success" })
			TrackForm({ formId: "onboard_specialty_delete", variant: "success" })
		} catch (e) {
			TrackForm({ formId: "onboard_specialty_delete", variant: "danger" })
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
				selectedSpecialty={selectedSpecialty}
				handleClose={() => {
					setAddModalOpen(false)
					setIsEditForm(false)
					setSelectedSpecialty(null)
				}}
				refreshData={fetchData}
				isEdit={isEditForm}
			/>
			<Delete
				title="Delete specialty?"
				open={deleteModal}
				isSubmitting={dltLoading}
				handleClose={() => setDeleteModal(false)}
				handleSubmit={handleDltFunc}
			/>
			<ListLayout
				title="Supported Specialty"
				noDataText="No specialty available"
				loading={loading}
				listItems={filteredList}
				actions={Actions}
				addModalClick={() => setAddModalOpen(true)}
			/>
		</>
	)
}

export default SupportedSpecialtyList
