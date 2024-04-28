import { useMutation } from "@apollo/client"
import { Box, CssBaseline, IconButton } from "@mui/material"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useState } from "react"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import { dltOrganisationMutation } from "../../../../../gql/mutations/Organzation"
import useOrganization from "../../../../../helpers/hooks/useOrganization"
import { TrackForm } from "../../../../../app/GlobalObjects/store/actions/TrackForm"
import Delete from "../../../../common/Modals/Delete"
import ListLayout from "../ListLayout"
import AddEditModal from "./Modal/AddEdit"

function OrganizationList(props) {
	const [addModalOpen, setAddModalOpen] = useState(false)
	const [isEditForm, setIsEditForm] = useState(false)
	const [deleteModal, setDeleteModal] = useState(false)
	const [selectedOrg, setSelectedOrg] = useState(false)
	const { enqueueSnackbar } = useSnackbar()

	const { data, loading, fetchData } = useOrganization()
	const [DltOrganisation, { loading: dltLoading }] = useMutation(dltOrganisationMutation)

	const searchValue = props.searchValue.toLowerCase()
	const filteredList =
		data.length !== 0
			? _.filter(
					data,
					(item) =>
						item.name.toLowerCase().includes(searchValue) || item.code.toLowerCase().includes(searchValue)
			  )
			: []

	const handleDelete = (item) => {
		setSelectedOrg(item)
		setDeleteModal(true)
	}

	const Actions = (item) => (
		<Box className="f g2">
			<IconButton
				sx={{ padding: "6px" }}
				onClick={() => {
					setIsEditForm(true)
					setSelectedOrg(item)
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
			await DltOrganisation({ variables: { organisationId: selectedOrg.id } })
			fetchData()
			setSelectedOrg(null)
			setDeleteModal(false)
			enqueueSnackbar("Organization deleted successfully.", { variant: "mui-alert", color: "success" })
			TrackForm({ formId: "onboard_organization_delete", variant: "success" })
		} catch (e) {
			TrackForm({ formId: "onboard_organization_delete", variant: "danger" })
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
				selectedOrg={selectedOrg}
				handleClose={() => {
					setAddModalOpen(false)
					setIsEditForm(false)
					setSelectedOrg(null)
				}}
				refreshData={fetchData}
				isEdit={isEditForm}
			/>
			<Delete
				title="Delete organization?"
				open={deleteModal}
				isSubmitting={dltLoading}
				handleClose={() => setDeleteModal(false)}
				handleSubmit={handleDltFunc}
			/>
			<ListLayout
				title="Organization"
				noDataText="No organization available"
				loading={loading}
				listItems={filteredList}
				actions={Actions}
				addModalClick={() => setAddModalOpen(true)}
			/>
		</>
	)
}

export default OrganizationList
