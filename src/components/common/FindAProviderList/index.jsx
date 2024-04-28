import React, { useEffect, useState } from "react"
import useSpecialty from "../../../helpers/hooks/useSpecialty"
import { findAProviderQuery } from "../../../gql/queries/FindAProvider"
import useGender from "../../../helpers/hooks/useGender"
import useLanguage from "../../../helpers/hooks/useLanguage"
import useAdditionalServices from "../../../helpers/hooks/useAdditionalServices"
import usePatientGroup from "../../../helpers/hooks/usePatientGroup"
import usePaymentOption from "../../../helpers/hooks/usePaymentOption"
import _ from "lodash"
import { useLazyQuery } from "@apollo/client"
import {
	Autocomplete,
	Box,
	CssBaseline,
	Divider,
	Fab,
	Fade,
	Grid,
	InputAdornment,
	Pagination,
	Skeleton,
	TextField,
	Typography,
	useScrollTrigger,
} from "@mui/material"
import { FiArrowDown, FiChevronUp, FiFilter, FiMap, FiMapPin, FiSearch, FiTag } from "react-icons/fi"
import Button from "../../utilities/Button"
import FilterDropDown from "../../utilities/FilterDropDown"
import ProviderCard from "./widgets/ProviderCard"
import { useDispatch } from "react-redux"
import { setPrePatientRegisterModal } from "../../../app/GlobalObjects/store/reducers/Modal"
import { Link } from "react-router-dom"
import MoreFilters from "./Modals/MoreFilters"
import { useSnackbar } from "notistack"
import ScrollToTop from "../../utilities/ScrollToTop"

const ETHINICITY_LIST = {
	White: "WHITE",
	"American Indian Or Alaska Native": "AMERICAN_INDIAN_OR_ALASKA_NATIVE",
	"Hispanic Or Latino": "HISPANIC_OR_LATINO",
	"Middle Eastern Or North African": "MIDDLE_EASTERN_OR_NORTH_AFRICAN",
	Black: "BLACK",
	"Native Hawaiian Or Pacific Islander": "NATIVE_HAWAIIAN_OR_PACIFIC_ISLANDER",
	Asian: "ASIAN",
}

const STYLES = {
	searchInput: {
		"& .MuiOutlinedInput-notchedOutline": {
			border: "none",
		},
		"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
			border: "none",
		},
	},
	findButton: {
		padding: "10px 48px",
		borderRadius: "11px",
		height: "60px",
		borderTopLeftRadius: "0px",
		borderBottomLeftRadius: "0px",
		textWrap: "nowrap",
	},
	clearFilter: {
		fontSize: "14px",
		lineHeight: "20px",
	},
	moreFilter: {
		padding: "8px 20px",
		borderRadius: "40px",
		border: "1px solid #9A9CB0",
		background: "#FFF",
		color: "#9A9CB0",
		fontSize: "14px",
		fontWeight: "400",
		lineHeight: "20px",
		cursor: "pointer",
		"&:hover": {
			borderColor: "#814CD6",
			background: "#F2EDFC",
			color: "#6728CC",
		},
	},
	purpleBox: {
		borderColor: "#814CD6",
		background: "#F2EDFC",
		color: "#6728CC",
	},
	bottomLink: {
		color: "#814CD6",
		fontSize: "16px",
		fontWeight: "500",
		lineHeight: "24px",
		display: "inline",
		textDecoration: "none",
	},
	bottomLinkText: {
		color: "#717385",
		fontSize: "16px",
		fontWeight: "500",
		lineHeight: "24px",
		display: "inline",
	},
	patientModal: {
		padding: "0px",
		display: "inline",
		fontWeight: "500",
		fontSize: "14px",
		lineHeight: "28px",
		border: "0px",
		"&:hover": {
			border: "0px",
			background: "0px",
		},
	},
}

function FindAProviderList(props) {
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const [firstRender, setFirstRender] = useState(true)
	const [providerData, setProviderData] = useState([])
	const [loading, setLoading] = useState(false)
	const [filterModal, setFilterModal] = useState(false)

	const [searchSpec, setSearchSpec] = useState(null)
	const [searchZip, setSearchZip] = useState("")

	const [gender, setGender] = useState([])
	const [speciality, setSpeciality] = useState([])
	const [ethnicity, setEthnicity] = useState([])
	const [additionalService, setAdditionalService] = useState([])
	const [paymentOption, setPaymentOption] = useState([])
	const [visitType, setVisitType] = useState([])

	const [language, setLanguage] = useState([])
	const [isLGBTQIA, setIsLGBTQIA] = useState(false)
	const [patientGroup, setPatientGroup] = useState([])
	const [isTransgender, setIsTransgender] = useState(false)

	const [paginationData, setPaginationData] = useState({
		currentPage: 1,
		totalPage: 0,
	})

	const { data: specData, loading: specLoading } = useSpecialty()
	const { data: genderData, loading: genderLoading } = useGender()
	const { data: langData, loading: langLoading } = useLanguage()
	const { data: aSData, loading: aSLoading } = useAdditionalServices()
	const { data: pGData, loading: pGLoading } = usePatientGroup()
	const { data: pOData, loading: pOLoading } = usePaymentOption()

	const [GetProviders] = useLazyQuery(findAProviderQuery, { fetchPolicy: "network-only" })

	useEffect(() => {
		const timeout = firstRender ? 0 : 1000
		setFirstRender(false)

		const debounceFunction = setTimeout(() => {
			fetchData()
		}, timeout)

		return () => clearTimeout(debounceFunction)
	}, [speciality, additionalService, gender, ethnicity, paymentOption, visitType])

	const removeIPrefer = (arr) => {
		_.remove(arr, (item) => item === "I prefer not to answer")
		return arr
	}

	const handleClearAllFilter = () => {
		setGender([])
		setSpeciality([])
		setEthnicity([])
		setLanguage([])
		setPatientGroup([])
		setAdditionalService([])
		setIsLGBTQIA(false)
		setIsTransgender(false)
		setPaymentOption([])
		setVisitType([])

		fetchData(false)
	}

	const fetchData = async (shouldFilter = true) => {
		setLoading(true)
		setFilterModal(false)
		try {
			const payload = {
				specialty: searchSpec,
				zipcode: searchZip,
				gender: [],
				speciality: [],
				ethnicity: [],
				patientGroup: [],
				additionalServices: [],
				paymentOptions: [],
				language: [],
				isTransgender: null,
				isLGBTQIA: null,
				acceptsClient: {
					acceptsInPerson: null,
					acceptsInVirtual: null,
				},
			}

			if (shouldFilter) {
				_.merge(payload, {
					gender,
					specialityFilter: speciality,
					ethnicity: _.map(ethnicity, (eth) => ETHINICITY_LIST[eth]),
					patientGroup: patientGroup,
					additionalServices: additionalService,
					paymentOptions: paymentOption,
					language: language,
					isTransgender: isTransgender ? "YES" : null,
					isLGBTQIA: isLGBTQIA ? "YES" : null,
					acceptsClient: {
						acceptsInPerson: _.includes(visitType, "In-person") ? true : null,
						acceptsInVirtual: _.includes(visitType, "Virtual") ? true : null,
					},
				})
			}

			let res = (await GetProviders({ variables: payload })).data.getAllProviderByCriteria.searchResult

			setPaginationData({ currentPage: 1, totalPage: res.length })

			const data = _.map(res, (provider) => {
				let location = []

				if (provider.acceptsInPerson && !_.get(provider, "inPersonPractices[0].hideLocation", false)) {
					location.push(_.get(provider, "inPersonPractices[0].state", ""))
				}

				if (provider.acceptsInVirtual) {
					_.forEach(_.get(provider, "virtualPractices[0].states", []), (state) =>
						location.push(_.get(state, "name", ""))
					)
				}

				if (provider.acceptsInPerson && provider.acceptsInVirtual) {
					location = _.uniq(location)
				}

				let service = _.chain(provider.additionalServices)
					.map((i) => i["serviceName"])
					.sortBy("length")
					.value()

				let count = 0
				const serviceFinal = _.takeWhile(service, (s) => {
					count += s.length
					return count <= 120
				})

				return {
					id: provider.id,
					name: `${provider.firstName} ${provider.lastName}`,
					inPerson: provider.acceptsInPerson,
					virtual: provider.acceptsInVirtual,
					specialty: _.chain(provider.specialities)
						.map("specialization")
						.concat(_.map(provider.subSpecialities, "specialization"))
						.value(),
					services: _.concat(serviceFinal, count > 120 ? ["see more"] : []),
					degree: _.chain(provider.primaryDegree)
						.map("degreeType")
						.concat(_.map(provider.additionalDegree, "degreeType"))
						.value(),
					profilePic: provider.profilePicUrl,
					isVetted: provider.isVetted,
					location: location,
				}
			})

			setProviderData(_.chunk(data, 12))
			setTimeout(() => {
				setLoading(false)
			}, 2000)
		} catch (e) {
			_.get(e, "graphQLErrors", []).forEach(({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	const isFiltered =
		speciality.length !== 0 ||
		gender.length !== 0 ||
		ethnicity.length !== 0 ||
		isTransgender ||
		isLGBTQIA ||
		patientGroup.length !== 0 ||
		language.length !== 0 ||
		additionalService.length !== 0 ||
		paymentOption.length !== 0 ||
		visitType.length !== 0

	return (
		<Box className="f f-c">
			<CssBaseline />
			<ScrollToTop />
			<MoreFilters
				open={filterModal}
				handleClose={() => setFilterModal(false)}
				language={language}
				setLanguage={setLanguage}
				langData={langData}
				isLGBTQIA={isLGBTQIA}
				setIsLGBTQIA={setIsLGBTQIA}
				isTrans={isTransgender}
				setIsTrans={setIsTransgender}
				patientGroup={patientGroup}
				setPatientGroup={setPatientGroup}
				pGData={_.map(pGData, "name")}
				handleSubmit={fetchData}
			/>
			<Box
				className="f f-c align-center g32"
				padding={{ xs: "40px 16px", md: "64px 16px" }}
				sx={{ backgroundColor: "#F9FAFB" }}
			>
				<Typography
					color="#1B1C20"
					fontFamily="Poppins"
					fontSize={{ xs: "24px", md: "40px" }}
					fontWeight="600"
					lineHeight={{ xs: "33px", md: "55px" }}
				>
					Find a provider
				</Typography>
				<Box
					className="align-center justify-center g2 b-r12"
					display={{ xs: "none", md: "flex" }}
					border="1px solid #D9DAE6"
					sx={{ backgroundColor: "#fff" }}
				>
					<Box maxWidth="502px" minWidth="380px" width="100%">
						<Autocomplete
							sx={STYLES.searchInput}
							fullWidth
							disabled={specLoading}
							loading={specLoading}
							value={searchSpec}
							options={specData ? _.map(specData, (spec) => spec.name) : []}
							getOptionLabel={(option) => option}
							renderOption={(props, option) => {
								return (
									<Box className="f align-center" {...props} gap="4px">
										<FiTag color="#b1b3c4" /> {option}
									</Box>
								)
							}}
							onChange={(e, value) => setSearchSpec(value)}
							ListboxProps={{ style: { maxHeight: "200px", textTransform: "capitalize" } }}
							renderInput={(params) => (
								<TextField
									name="specialty"
									type="text"
									placeholder={specLoading ? "Loading..." : "Search by specialty"}
									variant="outlined"
									{...params}
									InputProps={{
										...params.InputProps,
										startAdornment: (
											<InputAdornment position="start">
												<FiSearch />
											</InputAdornment>
										),
									}}
								/>
							)}
						/>
					</Box>
					<Divider orientation="vertical" variant="middle" flexItem />
					<TextField
						fullWidth
						name="zipcode"
						type="text"
						placeholder="Zip code"
						variant="outlined"
						sx={{ ...STYLES.searchInput, maxWidth: "220px" }}
						value={searchZip}
						onChange={(e) => setSearchZip(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<FiMapPin />
								</InputAdornment>
							),
						}}
					/>
					<Button
						id="find_a_provider_search"
						className="track_button"
						variant="contained"
						color="purple"
						onClick={fetchData}
						sx={STYLES.findButton}
					>
						Find a provider
					</Button>
				</Box>
				<Box className="f-c g8 w100" display={{ xs: "flex", md: "none" }} maxWidth="540px">
					<Autocomplete
						sx={{ background: "#fff" }}
						fullWidth
						disabled={specLoading}
						loading={specLoading}
						value={searchSpec}
						options={specData ? _.map(specData, (spec) => spec.name) : []}
						getOptionLabel={(option) => option}
						renderOption={(props, option) => {
							return (
								<Box className="f align-center" {...props} gap="6px">
									<FiTag color="#b1b3c4" /> {option}
								</Box>
							)
						}}
						onChange={(e, value) => setSearchSpec(value)}
						ListboxProps={{ style: { maxHeight: "200px", textTransform: "capitalize" } }}
						renderInput={(params) => (
							<TextField
								name="specialty"
								type="text"
								placeholder={specLoading ? "Loading..." : "Search by specialty"}
								variant="outlined"
								{...params}
								InputProps={{
									...params.InputProps,
									startAdornment: (
										<InputAdornment position="start" sx={{ paddingLeft: "2px" }}>
											<FiSearch />
										</InputAdornment>
									),
								}}
							/>
						)}
					/>
					<TextField
						sx={{ background: "#fff" }}
						fullWidth
						name="zipcode"
						type="text"
						placeholder="Zip code"
						variant="outlined"
						value={searchZip}
						onChange={(e) => setSearchZip(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<FiMapPin />
								</InputAdornment>
							),
						}}
					/>
					<Button
						id="find_a_provider_search"
						className="track_button"
						variant="contained"
						color="purple"
						onClick={fetchData}
					>
						Find a provider
					</Button>
				</Box>
			</Box>
			<Box className="f f-c g64 align-center w100" padding={{ xs: "40px 16px 208px", md: "40px 46px 264px" }}>
				<Box className="f f-c g64 w100" maxWidth="1248px">
					<Box className="f f-c g16" width="100%" maxWidth="1248px">
						<Typography
							className="f g6 align-center"
							color="#1B1C20"
							fontFamily="Poppins"
							fontSize="24px"
							fontWeight="600"
							lineHeight="33px"
						>
							{loading ? (
								<Skeleton width="40px" height="28px" sx={{ borderRadius: "6px" }} />
							) : (
								paginationData.totalPage
							)}{" "}
							Providers
						</Typography>
						<Box
							className="f g16"
							alignItems={{ xs: "start", sm: "start", md: "center" }}
							flexDirection={{ xs: "column", sm: "row" }}
						>
							<Box className="f justify-s-b" width={{ xs: "100%", sm: "fit-content" }}>
								<Typography
									className="f g6"
									color="#717385"
									fontSize="14px"
									fontWeight="500"
									lineHeight="20px"
								>
									<FiFilter size="20px" /> Filters
								</Typography>
								{isFiltered ? (
									<Button
										variant="text"
										color="purple"
										sx={{ ...STYLES.clearFilter, display: { xs: "flex", sm: "none" } }}
										onClick={handleClearAllFilter}
									>
										Clear all
									</Button>
								) : null}
							</Box>
							<Box className="f g8 align-center flex-wrap">
								<FilterDropDown
									title="Specialty"
									state={speciality}
									setState={setSpeciality}
									loading={specLoading}
									dropdownList={_.map(specData, "name")}
								/>
								<FilterDropDown
									title="Additional services"
									state={additionalService}
									setState={setAdditionalService}
									loading={aSLoading}
									dropdownList={_.map(aSData, "name")}
								/>
								<FilterDropDown
									title="Provider gender"
									state={gender}
									setState={setGender}
									loading={genderLoading}
									dropdownList={removeIPrefer(_.cloneDeep(genderData))}
								/>
								<FilterDropDown
									title="Provider race or ethnicity"
									state={ethnicity}
									setState={setEthnicity}
									dropdownList={Object.keys(ETHINICITY_LIST)}
								/>
								<FilterDropDown
									title="Insurance"
									state={paymentOption}
									loading={pOLoading}
									setState={setPaymentOption}
									dropdownList={pOData}
								/>
								<FilterDropDown
									title="Visit type"
									state={visitType}
									setState={setVisitType}
									dropdownList={["In-person", "Virtual"]}
								/>
								<Box
									className="f align-center justify-center"
									sx={{
										...STYLES.moreFilter,
										...(language.length !== 0 ||
										isLGBTQIA ||
										isTransgender ||
										patientGroup.length !== 0
											? STYLES.purpleBox
											: {}),
									}}
									onClick={() => setFilterModal(true)}
								>
									More filters
								</Box>

								{isFiltered ? (
									<Button
										variant="text"
										color="purple"
										sx={{ ...STYLES.clearFilter, display: { xs: "none", sm: "flex" } }}
										onClick={handleClearAllFilter}
									>
										Clear all
									</Button>
								) : null}
							</Box>
						</Box>
					</Box>
					<Grid container columns={12} columnSpacing="16px" rowSpacing="16px">
						{loading ? (
							_.times(12, (index) => (
								<Grid item xs={12} sm={12} md={6} key={index}>
									<Skeleton height="260px" width="100%" sx={{ minHeight: "260px" }} />
								</Grid>
							))
						) : providerData.length !== 0 ? (
							_.map(providerData[paginationData.currentPage - 1], (provider, index) => (
								<Grid item xs={12} sm={12} md={6} key={index}>
									<ProviderCard provider={provider} />
								</Grid>
							))
						) : (
							<Grid item xs={12} sm={12} md={12}>
								<Box
									className="f b-r12 align-center justify-center w100 flex-wrap"
									sx={{
										border: "1px solid #eaebf2",
										height: "400px",
										padding: "12px 16px",
									}}
								>
									<Typography
										display="inline"
										textAlign="center"
										fontWeight="500"
										fontSize="14px"
										lineHeight="20px"
										maxWidth="680px"
										color="#b1b3c4"
									>
										We are continuing to onboard clinicians. Please{" "}
										<Button
											variant="text"
											color="purple"
											sx={STYLES.patientModal}
											onClick={() => dispatch(setPrePatientRegisterModal(true))}
										>
											click here
										</Button>{" "}
										to be notified once clinicians are available in your area.
									</Typography>
								</Box>
							</Grid>
						)}
					</Grid>
					{providerData.length !== 0 ? (
						<Box className="f align-center justify-center g8 w100" padding="16px 16px 24px 0px">
							<Pagination
								shape="rounded"
								page={paginationData.currentPage}
								count={providerData.length}
								onChange={(page, value) => setPaginationData({ ...paginationData, currentPage: value })}
							/>
						</Box>
					) : null}
				</Box>
			</Box>
			<Box
				className="f f-c g40 justify-center"
				padding={{ xs: "40px 16px 112px", md: "40px 46px 112px" }}
				sx={{ backgroundColor: "#F9F9FB" }}
			>
				<Box className="f f-c g40" maxWidth="1248px">
					<Box className="f f-c g8">
						<Typography color="#1B1C20" fontSize="18px" fontWeight="600" lineHeight="26px">
							Disclaimer
						</Typography>
						<Typography color="#717385" fontSize="16px" fontWeight="400" lineHeight="24px">
							The material contained on this site is provided for informational purpose only. The
							information including but not limited to text, graphics, images and other material contained
							on this website are intended to increase awareness and provide information. Nothing
							contained on this site and its related links is intended to be a substitute for professional
							medical advice, diagnosis or treatment.
						</Typography>
					</Box>
					<Box className="f f-c g16">
						<Typography color="#1B1C20" fontSize="16px" fontWeight="400" lineHeight="24px">
							In case of an emergency, please call 911 or go to your local ER.
						</Typography>
						<Typography color="#1B1C20" fontSize="16px" fontWeight="400" lineHeight="24px">
							If you are in need of urgent care, the following resources provide free and confidential
							24/7 support:
						</Typography>
						<Box display="inline">
							<Typography
								sx={STYLES.bottomLink}
								component={Link}
								to="https://suicidepreventionlifeline.org/"
								target="_blank"
							>
								Crisis Text Line:
							</Typography>{" "}
							<Typography sx={STYLES.bottomLinkText}>Text ‘HOME’ to 741741</Typography>
						</Box>
						<Box display="inline">
							<Typography
								sx={STYLES.bottomLink}
								component={Link}
								to="https://www.crisistextline.org/"
								target="_blank"
							>
								Suicide & Crisis Lifeline:
							</Typography>{" "}
							<Typography sx={STYLES.bottomLinkText}>Call 988</Typography>
						</Box>
						<Box display="inline">
							<Typography
								sx={STYLES.bottomLink}
								component={Link}
								to="https://www.thetrevorproject.org/"
								target="_blank"
							>
								Trans Lifeline:
							</Typography>{" "}
							<Typography sx={STYLES.bottomLinkText}>Call (877) 565-8860</Typography>
						</Box>
						<Box display="inline">
							<Typography
								sx={STYLES.bottomLink}
								component={Link}
								to="https://www.thetrevorproject.org/"
								target="_blank"
							>
								Trevor Lifeline
							</Typography>{" "}
							<Typography sx={STYLES.bottomLinkText}>(youth ages 13-24): Call (866) 488-7386</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default FindAProviderList
