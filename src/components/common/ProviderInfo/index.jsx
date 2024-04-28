import { useLazyQuery } from "@apollo/client"
import _ from "lodash"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getProviderInfoQuery } from "../../../gql/queries/Providers"
import { Avatar, Box, Button, CssBaseline, Divider, InputLabel, Typography } from "@mui/material"
import ScrollToTop from "../../utilities/ScrollToTop"
import { IoCheckmarkCircle, IoHeart } from "react-icons/io5"
import { FiArrowLeft, FiCheck, FiGlobe, FiMail, FiPhone } from "react-icons/fi"
import { makeColor } from "../../utilities/Button"
import userAvatar from "../../../assets/imgs/user-avatar.png"
import LoadingSkeleton from "./widgets/LoadingSkeleton"
import { GraphQLError } from "graphql"
import { default as CButton } from "../../utilities/Button"

const STYLES = {
	iconBox: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "8px",
		minWidth: "40px",
		minHeight: "40px",
		maxWidth: "40px",
		maxHeight: "40px",
		backgroundColor: "#F2EDFC",
		color: "#814CD6",
		fontSize: "20px",
		lineHeight: "normal",
	},
	purpleOutlined: {
		border: "1px solid #ECE4FB",
		background: "#FFF",
		borderRadius: "36px",
		color: "#814CD6",
	},
	purpleContained: {
		border: "1px solid #F2EDFC",
		background: "#F2EDFC",
		borderRadius: "6px",
		color: "#814CD6",
	},
	grayContained: {
		border: "1px solid #F9F9FB",
		background: "#F9F9FB",
		borderRadius: "6px",
		color: "#717385",
	},
	backButton: {
		...makeColor({
			bgColor: "transparent",
			bgHoverColor: "transparent",
			borderColor: "transparent",
			borderHoverColor: "transparent",
			color: "#fff",
			colorHover: "#fff",
			shadowColor: "none",
			disbabledBgColor: "transparent",
			disabledBorderColor: "transparent",
			disabledColor: "#B1B3C4",
		}),
		padding: "10px 0px",
		width: "fit-content",
		gap: "8px",
		fontSize: "14px",
		fontWeight: "500",
		lineHeight: "20px",
	},
	infoBox: {
		padding: { xs: "24px 16px", md: "24px 32px" },
		borderRadius: "16px",
		border: "1px solid #FFF",
		backgroundColor: "#FFF",
		boxShadow: "0px 19px 46px 0px rgba(72, 58, 102, 0.08)",
	},
	refrenceLinks: {
		color: "#717385",
		fontSize: "16px",
		fontWeight: "400",
		lineHeight: "24px",
		textDecoration: "none",
	},
	platformTag: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "4px",
		borderRadius: "36px",
		padding: "8px 16px",
		fontSize: "14px",
		fontWeight: "500",
		lineHeight: "20px",
	},
	purple: {
		backgroundColor: "#F2EDFC",
		color: "#814CD6",
	},
	green: {
		backgroundColor: "#EAFEEF",
		color: "#14882F",
	},
}

function ProviderInfo(props) {
	const params = useParams()
	const [notFound, setNotFound] = useState(false)

	const [providerData, setProviderData] = useState({
		practiceEmail: "",
		practiceContactNumber: "",
		practiceURL: "",
		aboutYou: "",
		inPerson: false,
		inVirtual: false,
		name: "",
		services: [],
		genders: [],
		practiceName: "",
		inPersonPracticeAddress: "",
		inPersonPracticeData: {},
		virtualPracticeStates: [],
		isLGBTQIA: "NO",
		isTransgender: "NO",
		isVetted: false,
		languages: [],
		patientGroups: [],
		paymentOptions: [],
		degree: [],
		profilePicURL: "",
		pronouns: [],
		ethnicity: [],
		specialties: [],
	})

	const fetchData = async () => {
		try {
			const res = await GetProvider({
				variables: { providerId: props.providerId || params.id },
			})

			const provider = _.get(res, "data.getProvider", {})

			if (_.hasIn(res, "errors")) {
				throw new GraphQLError(res?.errors[0].message)
			}

			const data = {
				inPerson: provider.acceptsInPerson,
				inVirtual: provider.acceptsInVirtual,
				aboutYou: provider.aboutYou,
				contactNumber: provider.contactNumber,
				isLGBTQIA: provider.isLGBTQIA,
				isTransgender: provider.isTransgender,
				isVetted: provider.isVetted,
				practiceURL: provider.practiceURL,
				profilePicURL: provider.profilePicUrl,
				name: `${provider.firstName || ""} ${provider.lastName || ""}`,
				paymentOptions: provider.paymentOptions?.names,
				ethnicity: provider.ethnicities?.map((item) =>
					item
						.split("_")
						.map((i) => i.charAt(0).toUpperCase() + i.slice(1).toLowerCase())
						.join(" ")
				),
				pronouns: _.map(provider.pronouns, "name"),
				services: _.map(provider.additionalServices, "serviceName"),
				genders: _.map(provider.genders, "name"),
				languages: _.map(provider.languages, "name"),
				specialties: [
					...(_.map(provider.specialities, "specialization") || []),
					...(_.map(provider.subSpecialities, "specialization") || []),
				],
				degree: [
					...(_.map(provider.primaryDegree, "degreeType") || []),
					...(_.map(provider.additionalDegree, "degreeType") || []),
				],
				patientGroups: _.map(provider.patientGroups, "groupName"),
				practiceName:
					provider.acceptsInPerson && !_.get(provider, "inPersonPractices[0].hideLocation")
						? _.get(provider, "inPersonPractices[0].practiceName", "")
						: "",
				inPersonPracticeAddress:
					provider.acceptsInPerson && !_.get(provider, "inPersonPractices[0].hideLocation")
						? _.compact([
								provider.inPersonPractices[0].addressLine1,
								provider.inPersonPractices[0].addressLine2,
								provider.inPersonPractices[0].city,
								provider.inPersonPractices[0].state,
								provider.inPersonPractices[0].zipCode,
						  ]).join(", ")
						: "",
				virtualPracticeStates: provider.acceptsInVirtual
					? provider.virtualPractices?.[0]?.states?.map((item) => item.name) || []
					: [],
			}

			provider.preferences?.forEach((item) => {
				if (item.preferenceType === "WEBSITE") {
					data.practiceURL = provider.practiceURL
				} else if (item.preferenceType === "EMAIL") {
					data.practiceEmail = item.value
				} else {
					data.practiceContactNumber = item.value
				}
			})

			setProviderData({ ...providerData, ...data })
			setNotFound(false)
		} catch (e) {
			if (typeof e === "object") {
				if (e.message.includes("User not found")) {
					setNotFound(true)
				}
			}
			_.get(e, "graphQLErrors", []).forEach(({ message }) => {
				if (message.includes("User not found")) {
					print("fhdjhdgj")
					setNotFound(true)
				} else {
					enqueueSnackbar("We are facing some issues. Please try again.", {
						variant: "mui-alert",
						color: "error",
					})
				}
			})
		}
	}

	const [GetProvider, { loading }] = useLazyQuery(getProviderInfoQuery, {
		fetchPolicy: "network-only",
	})

	useEffect(() => {
		fetchData()
	}, [])

	const Tags = ({ variant = "outlined", color = "purple", data }) => (
		<Box className="f g6 align-center flex-wrap">
			{_.map(data, (item, index) => (
				<Typography
					className="f align-center justify-center"
					padding="8px 16px"
					fontSize="14px"
					fontWeight="500"
					lineHeight="20px"
					key={index}
					sx={STYLES[`${color}${_.capitalize(variant)}`]}
				>
					{item}
				</Typography>
			))}
		</Box>
	)

	const LabelContainer = ({ label, children }) => (
		<Box className="f f-c g8">
			<Typography color="#1B1C20" fontSize="16px" fontWeight="600" lineHeight="24px">
				{label}
			</Typography>
			{children}
		</Box>
	)

	return (
		<Box className="f f-c g24">
			<CssBaseline />
			<ScrollToTop />
			{loading ? (
				<LoadingSkeleton backButton={!Boolean(props.providerId)} />
			) : !notFound ? (
				<>
					<Box className="f f-c" gap={{ xs: "16px", md: "24px" }} sx={{ backgroundColor: "#814cd6" }}>
						<Box padding={{ xs: "16px 16px 0px", md: "40px 96px 0px" }}>
							{!Boolean(props.providerId) ? (
								<Button
									id="provider_detail_back_to_all_provider"
									className="track_button"
									LinkComponent={Link}
									to="/find-a-provider"
									sx={STYLES.backButton}
								>
									<FiArrowLeft /> Back to all provider
								</Button>
							) : null}
						</Box>
						<Box
							className="f flex-wrap g16"
							padding={{ xs: "0px 16px", md: "0px 96px" }}
							sx={{ background: "linear-gradient(to bottom, #814cd6 35%, #ffffff 35% 100%)" }}
						>
							<Box className="f g32" sx={STYLES.infoBox} flex={2} minWidth={{ xs: "300px", sm: "540px" }}>
								<Avatar
									sx={{
										display: { xs: "none", sm: "flex" },
										minWidth: "160px",
										minHeight: "160px",
										maxWidth: "160px",
										maxHeight: "160px",
										backgroundColor: "#f2edfc",
										animation: "fadeAnimation 1s infinite alternate",
									}}
									alt={providerData.name}
									src={providerData.profilePicURL || userAvatar}
									key={providerData.profilePicURL || userAvatar}
								/>
								<Box className="f f-c justify-center" gap={{ xs: "16px", sm: "24px" }}>
									<Box className="f g16">
										<Avatar
											sx={{
												display: { xs: "flex", sm: "none" },
												minWidth: "72px",
												minHeight: "72px",
												maxWidth: "72px",
												maxHeight: "72px",
												backgroundColor: "#f2edfc",
												animation: "fadeAnimation 1s infinite alternate",
											}}
											alt={providerData.name}
											src={providerData.profilePicURL || userAvatar}
											key={providerData.profilePicURL || userAvatar}
										/>
										<Box className="f f-c justify-center">
											<Box className="f g2 align-end flex-wrap">
												<Typography
													color="#1B1C20"
													fontFamily="Poppins"
													fontSize={{ xs: "18px", md: "28px" }}
													fontWeight="600"
													lineHeight={{ xs: "24px", md: "36px" }}
												>
													{providerData.name}, {_.join(providerData.degree, ", ")}
												</Typography>
												{providerData.pronouns.length !== 0 ? (
													<Typography
														color="#717385"
														fontSize="14px"
														fontWeight="500"
														lineHeight={{ xs: "20px", md: "28px" }}
													>
														({providerData.pronouns.join(", ")})
													</Typography>
												) : null}
											</Box>
											<Typography
												color="#717385"
												fontSize={{ xs: "14", md: "16px" }}
												fontWeight="500"
												lineHeight={{ xs: "20px", md: "24px" }}
											>
												{_.join(providerData.specialties, ", ")}
											</Typography>
										</Box>
									</Box>
									<Box className="f align-center g4 flex-wrap">
										{providerData.isVetted ? (
											<Typography sx={{ ...STYLES.platformTag, ...STYLES.purple }}>
												<IoCheckmarkCircle size="20px" /> inclusive+ vetted
											</Typography>
										) : null}
										{providerData.inPerson || providerData.inVirtual ? (
											<Box className="f align-center g4 flex-wrap">
												{providerData.inPerson ? (
													<Typography sx={{ ...STYLES.platformTag, ...STYLES.green }}>
														<FiCheck /> In-person
													</Typography>
												) : null}
												{providerData.inVirtual ? (
													<Typography sx={{ ...STYLES.platformTag, ...STYLES.green }}>
														<FiCheck /> Virtual
													</Typography>
												) : null}
											</Box>
										) : null}
									</Box>
								</Box>
							</Box>
							<Box flex={1} className="f f-c g16" sx={STYLES.infoBox} minWidth="300px">
								{providerData["practiceEmail"] ? (
									<Box className="f align-center g12">
										<Typography sx={STYLES.iconBox}>
											<FiMail />
										</Typography>
										<Typography
											sx={STYLES.refrenceLinks}
											component={Link}
											to={`mailto:${providerData.practiceEmail}`}
											target="_blank"
											rel="noreferrer"
										>
											{providerData.practiceEmail}
										</Typography>
									</Box>
								) : null}
								<Box className="f align-center g12">
									<Typography sx={STYLES.iconBox}>
										<FiPhone />
									</Typography>
									<Typography
										sx={STYLES.refrenceLinks}
										component={Link}
										to={
											providerData.practiceContactNumber
												? `tel:${providerData.practiceContactNumber}`
												: "#"
										}
										target="_self"
										rel="noreferrer"
									>
										{providerData.practiceContactNumber || "Not available"}
									</Typography>
								</Box>
								<Box className="f align-center g12">
									<Typography sx={STYLES.iconBox}>
										<FiGlobe />
									</Typography>
									<Typography
										sx={STYLES.refrenceLinks}
										component={Link}
										to={
											providerData.practiceURL
												? `${!providerData.practiceURL.startsWith("http") ? "//" : ""}${
														providerData.practiceURL
												  }`
												: ""
										}
										target="_blank"
										rel="noreferrer"
									>
										{providerData.practiceURL || "Not available"}
									</Typography>
								</Box>
							</Box>
						</Box>
					</Box>
					<Box
						className="f"
						padding={{
							xs: `24px 16px ${Boolean(props.providerId) ? "0px" : "208px"}`,
							md: `40px 96px ${Boolean(props.providerId) ? "0px" : "352px"}`,
						}}
					>
						<Box className="f f-c" gap="48px" maxWidth="768px">
							<Box className="f f-c g8">
								<Typography color="#1B1C20" fontSize="16px" fontWeight="600" lineHeight="24px">
									Services
								</Typography>
								<Tags variant="outlined" color="purple" data={providerData.services} />
							</Box>
							<Box className="f f-c g24">
								<Box className="f f-c g16">
									<Typography color="#1B1C20" fontSize="18px" fontWeight="600" lineHeight="26px">
										Personal information
									</Typography>
									<Divider />
								</Box>
								{providerData.aboutYou ? (
									<LabelContainer label="About">
										<Typography color="#717385" fontSize="16px" fontWeight="400" lineHeight="24px">
											{providerData.aboutYou}
										</Typography>
									</LabelContainer>
								) : null}
								{providerData.isLGBTQIA === "YES" || providerData.isTransgender === "YES" ? (
									<LabelContainer label="Identify as">
										<Box className="f align-center g6">
											{providerData.isLGBTQIA === "YES" ? (
												<Typography
													className="f g6 align-center justify-center"
													padding="8px 16px"
													fontSize="14px"
													fontWeight="500"
													lineHeight="20px"
													sx={STYLES.purpleContained}
												>
													<IoHeart size="16px" /> LGBTQIA+
												</Typography>
											) : null}
											{providerData.isTransgender === "YES" ? (
												<Typography
													className="f g6 align-center justify-center"
													padding="8px 16px"
													fontSize="14px"
													fontWeight="500"
													lineHeight="20px"
													sx={STYLES.purpleContained}
												>
													<IoHeart size="16px" /> Transgender
												</Typography>
											) : null}
										</Box>
									</LabelContainer>
								) : null}
								{providerData.pronouns.length !== 0 ? (
									<LabelContainer label="Pronouns">
										<Tags variant="contained" color="gray" data={providerData.pronouns} />
									</LabelContainer>
								) : null}
								{providerData.genders.length !== 0 ? (
									<LabelContainer label="Genders">
										<Tags variant="contained" color="gray" data={providerData.genders} />
									</LabelContainer>
								) : null}
								{providerData.ethnicity.length !== 0 ? (
									<LabelContainer label="Race or Ethnicity">
										<Tags variant="contained" color="gray" data={providerData.ethnicity} />
									</LabelContainer>
								) : null}
								{providerData.languages.length !== 0 ? (
									<LabelContainer label="Languages">
										<Tags variant="contained" color="gray" data={providerData.languages} />
									</LabelContainer>
								) : null}
							</Box>
							<Box className="f f-c g24">
								<Box className="f f-c g16">
									<Typography color="#1B1C20" fontSize="18px" fontWeight="600" lineHeight="26px">
										Professional information
									</Typography>
									<Divider />
								</Box>
								{providerData.degree.length !== 0 ? (
									<LabelContainer label="Degrees">
										<Tags variant="contained" color="gray" data={providerData.degree} />
									</LabelContainer>
								) : null}
								{providerData.patientGroups.length !== 0 ? (
									<LabelContainer label="Patient focus group">
										<Tags variant="outlined" color="purple" data={providerData.patientGroups} />
									</LabelContainer>
								) : null}
								{providerData.inPerson || providerData.inVirtual ? (
									<LabelContainer label="Practice location">
										<Box className="f f-c g16">
											{providerData.inPerson ? (
												<Box className="f f-c g8">
													<Typography
														className="f g6 align-center"
														color="#14882F"
														fontSize="16px"
														fontWeight="500"
														lineHeight="24px"
													>
														<IoCheckmarkCircle size="20px" />
														In-person
													</Typography>
													<Box className="f f-c g4">
														{providerData.practiceName ? (
															<Typography
																color="#1B1C20"
																fontSize="16px"
																fontWeight="500"
																lineHeight="24px"
															>
																{providerData.practiceName}
															</Typography>
														) : null}
														{providerData.inPersonPracticeAddress ? (
															<Typography
																color="#717385"
																fontSize="16px"
																fontWeight="400"
																lineHeight="24px"
															>
																{providerData.inPersonPracticeAddress}
															</Typography>
														) : null}
													</Box>
												</Box>
											) : null}
											{providerData.inVirtual ? (
												<Box className="f f-c g8">
													<Typography
														className="f g6 align-center"
														color="#14882F"
														fontSize="16px"
														fontWeight="500"
														lineHeight="24px"
													>
														<IoCheckmarkCircle size="20px" />
														Virtual
													</Typography>
													<Tags
														variant="contained"
														color="gray"
														data={providerData.virtualPracticeStates}
													/>
												</Box>
											) : null}
										</Box>
									</LabelContainer>
								) : null}
								{providerData.paymentOptions.length !== 0 ? (
									<LabelContainer label="Payments accepted">
										<Tags variant="contained" color="gray" data={providerData.paymentOptions} />
									</LabelContainer>
								) : null}
							</Box>
						</Box>
					</Box>
				</>
			) : (
				<Box className="f f-c g8 align-center justify-center" height="540px" padding="60px 16px 120px">
					<Box className="f f-c g24 align-center" maxWidth="400px">
						<Box className="f f-c g8 align-center">
							<Typography color="#1B1C20" fontSize="48px" fontWeight="600" lineHeight="42px">
								404
							</Typography>
							<Typography
								color="#717385"
								textAlign="center"
								fontSize="14px"
								fontWeight="500"
								lineHeight="22px"
							>
								The provider account you are looking for is either not available or has been deleted.
								Please click the button below to access the providers list and search for more accurate
								results.
							</Typography>
						</Box>
						<CButton component={Link} to="/find-a-provider" variant="contained" color="purple">
							Find a provider page
						</CButton>
					</Box>
				</Box>
			)}
		</Box>
	)
}

export default ProviderInfo
