import { useLazyQuery, useMutation } from "@apollo/client"
import {
	Box,
	CircularProgress,
	IconButton,
	Paper,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material"
import _ from "lodash"
import moment from "moment"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { FiEye } from "react-icons/fi"
import {
	DIRECTORY_OPTIONS,
	INTERVIEW_OPTIONS,
	STATUS_TAGS,
	VETTED_TAGS,
} from "../../../../Constants/data-types/provider-formats"
import { CME_RATING_LIST } from "../../../../Constants/data-types/cme-formats"
import { updateCMECertificateStatusMutation } from "../../../../gql/mutations/Certificates"
import { updateProviderInterviewStatusMutation } from "../../../../gql/mutations/Interviews"
import { updateLicenceStatusMutation } from "../../../../gql/mutations/Licence"
import {
	addUpdateProviderAccountStatusMutation,
	updateProviderVettingStatusMutation,
} from "../../../../gql/mutations/Providers/ForAdmin"
import { getAllCertificatesByProviderIdQuery, getCMECertificateByIdQuery } from "../../../../gql/queries/Certificates"
import { getAllInterviewByProviderIdQuery } from "../../../../gql/queries/Interviews"
import { getProviderByIdQuery } from "../../../../gql/queries/Providers"
import useDirtyState from "../../../../helpers/hooks/useDirtyState"
import { TrackForm } from "../../../../app/GlobalObjects/store/actions/TrackForm"
import Button from "../../../utilities/Button"
import InputLabelContainer from "../../../utilities/InputLabelContainer"
import RowInputLabelContainer from "../../../utilities/RowInputLabelContainer"
import CustomSelect from "../../../utilities/Select"
import { useNavigate } from "react-router-dom"

function EditStatus({ id }) {
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar()

	const [name, setName] = useState("")
	const [oS, setOS, isDirtyOS, resetOS, resetInitOS] = useDirtyState("PENDING")
	const [vS, setVS, isDirtyVS, resetVS, resetInitVS] = useDirtyState(false)
	const [iS, setIS, isDirtyIS, resetIS, resetInitIS, initIS] = useDirtyState([])
	const [lD, setLD, isDirtyLD, resetLD, resetInitLD, initLD] = useDirtyState([])
	const [cmeS, setCMES, isDirtyCMES, resetCMES, resetInitCMES, initCMES] = useDirtyState([])
	const [loadingCME, setLoadingCME] = useState({ id: null, loading: false })

	const [loading, setLoading] = useState(true)

	const [GetProvider] = useLazyQuery(getProviderByIdQuery, {
		variables: { providerId: Number(id) },
		fetchPolicy: "network-only",
	})
	const [GetAllCertificates] = useLazyQuery(getAllCertificatesByProviderIdQuery, {
		variables: { providerId: id },
		fetchPolicy: "network-only",
	})
	const [GetAllInterview] = useLazyQuery(getAllInterviewByProviderIdQuery, {
		variables: { providerId: id },
		fetchPolicy: "network-only",
	})
	const [ViewCertificate] = useLazyQuery(getCMECertificateByIdQuery, { fetchPolicy: "network-only" })

	const [UpdateLicenceStatus, { loading: licenceLoading }] = useMutation(updateLicenceStatusMutation)
	const [UpdateCMECertificateStatus, { loading: cmeLoading }] = useMutation(updateCMECertificateStatusMutation)
	const [UpdateProviderInterviewStatus, { loading: viewCMELoading }] = useMutation(
		updateProviderInterviewStatusMutation
	)
	const [UpdateProviderOverallStatus, { loading: overallLoading }] = useMutation(
		addUpdateProviderAccountStatusMutation
	)
	const [UpdateProviderVettingStatus, { loading: vettingLoading }] = useMutation(updateProviderVettingStatusMutation)

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		setLoading(true)
		try {
			const {
				data: { getProvider: providerData },
			} = await GetProvider()
			const overallStatus = _.includes(["ONBOARDED", "SUSPENDED", "REJECTED"], providerData.status)
				? providerData.status
				: "PENDING"
			const [interviewData, cmeData] = await Promise.all([handleInterviewDataFetch(), handleCMEDataFetch()])
			const licenseData = handleLicenseDataFetch(providerData.licences)

			setName(`${providerData.firstName} ${providerData.lastName}`)

			await setOS(overallStatus)
			await setVS(providerData.isVetted)
			await setIS(interviewData)
			await setCMES(cmeData)
			await setLD(licenseData)

			resetInitOS(overallStatus)
			resetInitVS(providerData.isVetted)
			resetInitIS(interviewData)
			resetInitCMES(cmeData)
			resetInitLD(licenseData)
			setLoading(false)
		} catch (error) {
			handleFetchError(error)
		}
	}

	const handleInterviewDataFetch = async () => {
		try {
			const {
				data: { getAllInterviewByProviderId: interviewData },
			} = await GetAllInterview()
			return interviewData
		} catch (error) {
			handleFetchError(error)
			return []
		}
	}

	const handleCMEDataFetch = async () => {
		try {
			const {
				data: { getAllCertificatesByProviderId: certificates },
			} = await GetAllCertificates()
			return _.map(certificates, (item) => ({
				id: item.certificateId,
				certificateName: item.certificateName,
				completionDate: moment(item.completionDate).format("L"),
				credits: item.points.toFixed(2),
				status: _.find(STATUS_TAGS, { value: item.status }),
				certificateURL: item.certificateURL,
				rating: item.rating !== null ? _.find(CME_RATING_LIST, { value: item.rating })?.label || "-" : "-",
			}))
		} catch (error) {
			handleFetchError(error)
			return []
		}
	}

	const handleLicenseDataFetch = (data) => {
		return _.map(data, (item) => ({
			id: item.id,
			licenseNo: item.number,
			state: item.state[0].toUpperCase() + item.state.slice(1),
			status: _.find(STATUS_TAGS, { value: item.status }),
		}))
	}

	const handleFetchError = (error) => {
		_.forEach(
			_.get(error, "graphQLErrors", [{ message: "Something went wrong. Please try again." }]),
			({ message }) => enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
		)
	}

	const handleShowCertificate = async (certId) => {
		try {
			setLoadingCME({ id: certId, loading: true })
			const res = await ViewCertificate({ variables: { certificateId: certId } })
			window.open(res.data.getCMECertificateById.launchLink)
		} catch (e) {
			handleFetchError(e)
		}
		setLoadingCME({ id: null, loading: false })
	}

	const handleSubmit = async () => {
		if (isDirtyOS) {
			await handleOSSubmit()
		}
		if (isDirtyVS) {
			await handleVSSubmit()
		}
		if (isDirtyIS) {
			await handleISSubmit()
		}
		if (isDirtyLD) {
			await handleLDSubmit()
		}
		if (isDirtyCMES) {
			await handleCMESubmit()
		}
	}

	const handleOSSubmit = async () => {
		try {
			await UpdateProviderOverallStatus({
				variables: {
					providerId: id,
					accountStatus: oS,
				},
			})
			resetInitOS()
			enqueueSnackbar("Directory status updated successfully.", { variant: "mui-alert", color: "success" })
			TrackForm({ formId: "provider_overall_status_update", variant: "success" })
		} catch (error) {
			TrackForm({ formId: "provider_overall_status_update", variant: "danger" })
			enqueueSnackbar("Something went wrong while updating directory status. Please try again.", {
				variant: "mui-alert",
				color: "error",
			})
			_.forEach(_.get(error, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	const handleVSSubmit = async () => {
		try {
			await UpdateProviderVettingStatus({
				variables: {
					providerId: id,
					vettingStatus: vS,
				},
			})
			resetInitVS()
			enqueueSnackbar("Vetting status updated successfully.", { variant: "mui-alert", color: "success" })
			TrackForm({ formId: "provider_vetting_status_update", variant: "success" })
		} catch (error) {
			TrackForm({ formId: "provider_vetting_status_update", variant: "danger" })
			enqueueSnackbar("Something went wrong while updating vetting status. Please try again.", {
				variant: "mui-alert",
				color: "error",
			})
			_.forEach(_.get(error, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	const handleISSubmit = async () => {
		try {
			for (const [index, interview] of iS.entries()) {
				if (interview.status !== initIS[index].status) {
					await UpdateProviderInterviewStatus({
						variables: {
							providerId: id,
							id: interview.id,
							status: interview.status,
						},
					})
				}
			}
			resetInitIS()
			TrackForm({ formId: "provider_interview_status_update", variant: "success" })
			enqueueSnackbar("Interview's status updated successfully.", { variant: "mui-alert", color: "success" })
		} catch (error) {
			TrackForm({ formId: "provider_interview_status_update", variant: "danger" })
			enqueueSnackbar("Something went wrong while updating interview's status. Please try again.", {
				variant: "mui-alert",
				color: "error",
			})
			_.forEach(_.get(error, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	const handleLDSubmit = async () => {
		try {
			for (const [index, licence] of lD.entries()) {
				if (licence.status.value !== initLD[index].status.value) {
					await UpdateLicenceStatus({
						variables: {
							licenceId: licence.id,
							status: licence.status.value,
						},
					})
				}
			}
			resetInitLD()
			TrackForm({ formId: "provider_licence_status_update", variant: "success" })
			enqueueSnackbar("Licence's status updated successfully.", { variant: "mui-alert", color: "success" })
		} catch (error) {
			TrackForm({ formId: "provider_licence_status_update", variant: "danger" })
			enqueueSnackbar("Something went wrong while updating licence's status. Please try again.", {
				variant: "mui-alert",
				color: "error",
			})
			_.forEach(_.get(error, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	const handleCMESubmit = async () => {
		try {
			for (const [index, cme] of cmeS.entries()) {
				if (cme.status.value !== initCMES[index].status.value) {
					await UpdateCMECertificateStatus({
						variables: {
							certificateId: Number(cme.id),
							certificateStatus: cme.status.value,
						},
					})
				}
			}
			resetInitCMES()
			TrackForm({ formId: "provider_CMECertificate_status_update", variant: "success" })
			enqueueSnackbar("CME certificate's status updated successfully.", {
				variant: "mui-alert",
				color: "success",
			})
		} catch (error) {
			TrackForm({ formId: "provider_CMECertificate_status_update", variant: "danger" })
			enqueueSnackbar("Something went wrong while updating cme certificate's status. Please try again.", {
				variant: "mui-alert",
				color: "error",
			})
			_.forEach(_.get(error, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	const isSubmitting = licenceLoading || cmeLoading || viewCMELoading || overallLoading || vettingLoading
	const isDirty = isDirtyIS || isDirtyOS || isDirtyVS || isDirtyLD || isDirtyCMES

	return (
		<Box className="f f-c b-r8" border="1px solid #eaebf2">
			<Box className="f g12 justify-s-b flex-wrap" padding="12px 16px" borderBottom="1px solid #eaebf2">
				<Box className="f f-c g4" minWidth="240px">
					<Typography fontWeight="400" fontSize="14px" lineHeight="20px" color="#717385">
						Provider name
					</Typography>
					<Typography
						fontWeight="500"
						fontSize="18px"
						lineHeight="26px"
						textTransform="capitalize"
						color="#1b1c20"
					>
						{loading ? <Skeleton height="26px" sx={{ borderRadius: "6px" }} /> : name}
					</Typography>
				</Box>
				<Box className="f align-center g12">
					<Button
						sx={{ padding: "10px 16px", fontSize: "14px", lineHeight: 1.5 }}
						variant="outlined"
						color="purple"
						disabled={isSubmitting}
						onClick={() => navigate("/dashboard/admin/providers")}
					>
						Back
					</Button>
					<Button
						sx={{ padding: "10px 16px", fontSize: "14px", lineHeight: 1.5 }}
						variant="contained"
						color="purple"
						disabled={isSubmitting || !isDirty}
						onClick={handleSubmit}
					>
						{isSubmitting ? "Please wait..." : "Update changes"}
					</Button>
				</Box>
			</Box>
			<Box className="f f-c g24" padding="12px 16px">
				<Box className="f f-c g24 w100" maxWidth="734px">
					<RowInputLabelContainer label="Directory status" labelWrap={false}>
						<Box className="w100" maxWidth="502px">
							<CustomSelect
								isDisabled={loading}
								isLoading={loading}
								value={_.find(DIRECTORY_OPTIONS, (item) => item.value === oS)}
								options={DIRECTORY_OPTIONS}
								placeholder="Select"
								onChange={(value) => setOS(value.value)}
							/>
						</Box>
					</RowInputLabelContainer>
					<RowInputLabelContainer label="Vetting status" labelWrap={false}>
						<Box className="w100" maxWidth="502px">
							<CustomSelect
								isDisabled={loading}
								isLoading={loading}
								value={{
									value: vS,
									label: vS ? "Vetted" : "Non-vetted",
								}}
								options={VETTED_TAGS}
								placeholder="Select"
								onChange={(value) => setVS(value.value)}
							/>
						</Box>
					</RowInputLabelContainer>
					{loading ? (
						<Skeleton height="80px" />
					) : iS.length !== 0 ? (
						<Box className="f f-c g24">
							{_.map(iS, (interview, index) => (
								<RowInputLabelContainer
									key={index}
									label="Interview status"
									labelHelper={`Scheduled on: ${moment(
										moment(interview.startTime).format("L LT")
									).format("DD/MM/YY hh:mm a")}`}
									labelWrap={false}
								>
									<Box className="w100" maxWidth="502px">
										<CustomSelect
											value={_.find(
												INTERVIEW_OPTIONS,
												(option) => option.value === interview.status
											)}
											options={INTERVIEW_OPTIONS}
											placeholder="Select"
											onChange={(value) => {
												let interviewData = _.cloneDeep(iS)
												interviewData[index].status = value.value
												setIS(interviewData)
											}}
										/>
									</Box>
								</RowInputLabelContainer>
							))}
						</Box>
					) : (
						<Typography
							className="f align-center justify-center b-r8"
							height="80px"
							border="1px solid #eaebf2"
							color="#b1b3c4"
							fontWeight="500"
							fontSize="14px"
							lineHeight="20px"
						>
							No interview scheduled by provider till now.
						</Typography>
					)}
				</Box>
				<InputLabelContainer label="Licence status">
					<Box overflow="auto" sx={{ display: "table", tableLayout: "fixed", width: "100%" }}>
						<Paper elevation={0}>
							<TableContainer sx={{ maxHeight: "400px" }}>
								<Table stickyHeader sx={{ minWidth: 460 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell sx={{ minWidth: "200px" }}>Licence number</TableCell>
											<TableCell sx={{ minWidth: "200px" }}>State</TableCell>
											<TableCell sx={{ minWidth: "360px" }}>Status</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{loading ? (
											_.times(4, (index) => (
												<TableRow
													key={index}
													sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
												>
													<TableCell colSpan={3}>
														<Skeleton height="40px" />
													</TableCell>
												</TableRow>
											))
										) : lD.length !== 0 ? (
											lD.map((licence, index) => (
												<TableRow
													key={index}
													sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
												>
													<TableCell>{licence.licenseNo}</TableCell>
													<TableCell>{licence.state}</TableCell>
													<TableCell>
														<CustomSelect
															value={_.find(
																STATUS_TAGS,
																(option) => option.value === licence.status.value
															)}
															options={STATUS_TAGS}
															placeholder="Select"
															onChange={(value) => {
																let licenceData = _.cloneDeep(lD)
																licenceData[index].status = value
																setLD(licenceData)
															}}
														/>
													</TableCell>
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell colSpan={3}>
													<Typography
														fontWeight="500"
														fontSize="14px"
														lineHeight="20px"
														color="#b1b3c4"
													>
														No licence uploaded by provider
													</Typography>
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</TableContainer>
						</Paper>
					</Box>
				</InputLabelContainer>
				<InputLabelContainer label="CME certificate status">
					<Box overflow="auto" sx={{ display: "table", tableLayout: "fixed", width: "100%" }}>
						<Paper elevation={0}>
							<TableContainer sx={{ maxHeight: "400px" }}>
								<Table stickyHeader sx={{ minWidth: 460 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell sx={{ minWidth: "300px" }}>Certificate name</TableCell>
											<TableCell align="center" sx={{ minWidth: "200px" }}>
												Completion date
											</TableCell>
											<TableCell align="center" sx={{ minWidth: "160px" }}>
												Credits
											</TableCell>
											<TableCell align="center" sx={{ minWidth: "160px" }}>
												Rating
											</TableCell>
											<TableCell sx={{ minWidth: "360px" }}>Status</TableCell>
											<TableCell sx={{ minWidth: "100px" }}>Action</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{loading ? (
											_.times(4, (index) => (
												<TableRow
													key={index}
													sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
												>
													<TableCell colSpan={6}>
														<Skeleton height="40px" />
													</TableCell>
												</TableRow>
											))
										) : cmeS.length !== 0 ? (
											cmeS.map((cme, index) => (
												<TableRow
													key={index}
													sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
												>
													<TableCell>{cme.certificateName}</TableCell>
													<TableCell align="center">
														{moment(moment(cme.completionDate).format("L")).format(
															"DD/MM/YY"
														)}
													</TableCell>
													<TableCell align="center">{cme.credits}</TableCell>
													<TableCell align="center">{cme.rating}</TableCell>
													<TableCell>
														<CustomSelect
															value={_.find(
																STATUS_TAGS,
																(option) => option.value === cme.status.value
															)}
															options={STATUS_TAGS}
															placeholder="Select"
															onChange={(value) => {
																let cmeData = _.cloneDeep(cmeS)
																cmeData[index].status = value
																setCMES(cmeData)
															}}
														/>
													</TableCell>
													<TableCell>
														<IconButton onClick={() => handleShowCertificate(cme.id)}>
															{loadingCME.loading && loadingCME.id === cme.id ? (
																<CircularProgress thickness={5} size="18px" />
															) : (
																<FiEye size="18px" />
															)}
														</IconButton>
													</TableCell>
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell colSpan={3}>
													<Typography
														fontWeight="500"
														fontSize="14px"
														lineHeight="20px"
														color="#b1b3c4"
													>
														No cme certificate uploaded by provider
													</Typography>
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</TableContainer>
						</Paper>
					</Box>
				</InputLabelContainer>
			</Box>
		</Box>
	)
}

export default EditStatus
