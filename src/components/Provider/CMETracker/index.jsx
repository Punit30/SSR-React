import { useLazyQuery, useMutation } from "@apollo/client"
import { useTheme } from "@emotion/react"
import { Box, CssBaseline, Typography, useMediaQuery } from "@mui/material"
import _ from "lodash"
import moment from "moment"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { connect } from "react-redux"
import { deleteCMECertificateMutation } from "../../../gql/mutations/Providers/ForProvider"
import { getAllCertificatesByProviderIdQuery, getCMECertificateByIdQuery } from "../../../gql/queries/Providers"
import { TrackForm } from "../../../app/GlobalObjects/store/actions/TrackForm"
import Delete from "../../common/Modals/Delete"
import Button from "../../utilities/Button"
import AddEditCert from "./modals/AddEditCert"
import DesktopView from "./views/DesktopView"
import TabletView from "./views/TabletView"

function CMETrackerTable({ id }) {
	const { enqueueSnackbar } = useSnackbar()
	const theme = useTheme()
	const isMD = useMediaQuery(theme.breakpoints.up("md"))

	const [dltModal, setDltModal] = useState(false)
	const [certificates, setCertificates] = useState([])
	const [uploadModal, setUploadModal] = useState(false)
	const [selectedCert, setSelectedCert] = useState(null)
	const [isEditForm, setIsEditForm] = useState(false)
	const [loadingCert, setLoadingCert] = useState({ id: null, loading: false })

	const [GetAllCert, { loading }] = useLazyQuery(getAllCertificatesByProviderIdQuery, {
		variables: { providerId: id },
		fetchPolicy: "network-only",
	})
	const [GetCertById] = useLazyQuery(getCMECertificateByIdQuery, { fetchPolicy: "network-only" })

	const [DltCert, { loading: dltLoading }] = useMutation(deleteCMECertificateMutation)

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		const res = (await GetAllCert()).data.getAllCertificatesByProviderId

		const data = _.map(res, (item) => {
			return {
				certificateId: item.certificateId,
				certificateName: item.certificateName,
				certificateURL: item.certificateURL,
				completionDate: moment(item.completionDate).format("L"),
				value: item.points.toFixed(2),
				status: item.status,
				rating: item.rating,
			}
		})
		setCertificates(data)
	}

	const handleCertPreview = async (certId) => {
		setLoadingCert({ id: certId, loading: true })
		try {
			const res = await GetCertById({
				variables: { certificateId: certId },
			})
			window.open(res.data.getCMECertificateById.launchLink)
		} catch (e) {
			e.graphQLErrors.forEach(({ message }) => {
				enqueueSnackbar("We are facing some issues. Please try again later.", {
					variant: "mui-alert",
					color: "error",
				})
			})
		} finally {
			setLoadingCert({ id: null, loading: false })
		}
	}

	const handleCertificateDlt = async () => {
		setDltModal(true)
		try {
			await DltCert({ variables: { certificateId: selectedCert.certificateId } })
			fetchData()
			setDltModal(false)
			TrackForm({ formId: "provider_certificate_dlt", variant: "success" })
			enqueueSnackbar("Your certificate has been deleted.", {
				variant: "mui-alert",
				color: "success",
			})
		} catch (e) {
			TrackForm({ formId: "provider_certificate_dlt", variant: "danger" })
			enqueueSnackbar("We are facing some issues. Please try again later.", {
				variant: "mui-alert",
				color: "error",
			})
		} finally {
			setSelectedCert(null)
		}
	}

	const attributes = {
		data: certificates,
		loading: loading,
		setUploadModal: setUploadModal,
		selectedCert: selectedCert,
		setSelectedCert: setSelectedCert,
		loadingCert: loadingCert,
		setLoadingCert: setLoadingCert,
		handleCertPreview: handleCertPreview,
		setDltModal: setDltModal,
		setIsEditForm: setIsEditForm,
	}

	return (
		<Box className="f f-c g24">
			<CssBaseline />
			<Delete
				title="Are you sure you want to delete the certificate?"
				open={dltModal}
				isSubmitting={dltLoading}
				handleClose={() => {
					setDltModal(false)
					setSelectedCert(null)
				}}
				handleSubmit={handleCertificateDlt}
				width="420px"
			/>
			<AddEditCert
				open={uploadModal}
				handleClose={() => {
					setSelectedCert(null)
					setUploadModal(false)
					setIsEditForm(false)
				}}
				selectedCert={selectedCert}
				isEdit={isEditForm}
				refreshData={fetchData}
			/>
			<Box
				className="f align-center g8 flex-wrap justify-s-b"
				paddingBottom="16px"
				borderBottom="1px solid #EAEBF2"
			>
				<Box className="f f-c" gap="2px">
					<Typography
						color="#1B1C20"
						fontSize={{ xs: "14px", sm: "16px", md: "18px" }}
						fontWeight="500"
						lineHeight={{ xs: "20px", sm: "24px", md: "26px" }}
					>
						Upload your certificate of CME completion
					</Typography>
					<Typography color="#717385" fontSize="14px" fontWeight="400" lineHeight="20px">
						Only certificates in PDF formats can directly included in reports.
					</Typography>
				</Box>
				<Button
					id="upload_cme_certificate"
					className="track_button"
					color="purple"
					variant="contained"
					sx={{ padding: "10px 16px", fontSize: "14px", lineHeight: "20px" }}
					onClick={() => setUploadModal(true)}
				>
					<FiUpload size="20px" /> Upload file
				</Button>
			</Box>
			{isMD ? <DesktopView {...attributes} /> : <TabletView {...attributes} />}
		</Box>
	)
}

const mapStateToProps = (state) => ({
	id: state.local.providerReducer.providerId,
})

export default connect(mapStateToProps)(CMETrackerTable)
