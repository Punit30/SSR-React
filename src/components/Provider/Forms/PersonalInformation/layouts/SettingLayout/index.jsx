import { Avatar, Box, FormHelperText, IconButton, Skeleton, TextField, Typography } from "@mui/material"
import _ from "lodash"
import React from "react"
import { FiTrash2, FiUploadCloud } from "react-icons/fi"
import { IoCheckmarkCircle, IoEllipseOutline } from "react-icons/io5"
import {
	AGE_GROUP_OPTIONS,
	PRACTICE_YEARS_OPTIONS,
	RACE_OPTIONS,
} from "../../../../../../Constants/data-types/provider-formats"
import profilePic from "../../../../../../assets/imgs/user-avatar.png"
import { ScrollToFormError } from "../../../../../../helpers/FormErrorScroll"
import Button from "../../../../../utilities/Button"
import RowInputLabelContainer from "../../../../../utilities/RowInputLabelContainer"
import CustomSelect from "../../../../../utilities/Select"
import CheckBoxGrid from "../../widgets/CheckBoxGrid"
import Loading from "./loading/Loading"

const STYLES = {
	picUpload: { fontSize: "14px", lineHeight: "20px", padding: "10px 16px" },
	picDlt: {
		color: "#717385",
		borderRadius: "8px",
		border: "1px solid #717385",
		padding: "10px",
		":hover": {
			color: "#ef4444",
			borderColor: "#ef4444",
			background: "#FFF",
		},
	},
	pic: {
		backgroundColor: "#f2edfc",
		animation: "fadeAnimation 1s infinite alternate",
		maxWidth: "72px",
		maxHeight: "72px",
		minHeight: "72px",
		minWidth: "72px",
	},
}

function SettingLayout({
	fileRef,
	formik,
	loading = false,
	genderData = [],
	genderLoading = false,
	langData = [],
	langloading = false,
	proData = [],
	proLoading = false,
	handleFileUpload = () => {},
}) {
	return (
		<form className="f f-c" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
			<ScrollToFormError formik={formik} />
			<Box
				className="f align-center justify-s-b g12 flex-wrap"
				padding="0px 0px 14px"
				borderBottom="1px solid #eaebf2"
			>
				<Typography color="#1B1C20" fontSize="18px" fontWeight="500" lineHeight="26px">
					Personal information
				</Typography>
				<Box className="f g12">
					<Button id="discard" className="track_button" variant="outlined" color="purple" type="reset">
						Discard
					</Button>
					<Button
						id="update"
						className="track_button"
						type="submit"
						variant="contained"
						color="purple"
						disabled={formik.isSubmitting || !formik.dirty}
					>
						{formik.isSubmitting ? "Please wait..." : "Update"}
					</Button>
				</Box>
			</Box>
			{loading ? (
				<Loading />
			) : (
				<Box className="f f-c g32" padding="14px 0px 0px" maxWidth="820px">
					<RowInputLabelContainer
						label="Your name"
						labelWrap={false}
						alignLabel="start"
						labelMinWidth="240px"
					>
						<Box className="f f-c g16 w100" maxWidth="502px" datafieldname="firstName">
							<TextField
								datafieldname="firstName"
								fullWidth
								id="firstName"
								name="firstName"
								type="text"
								placeholder="Please enter your firstname"
								variant="outlined"
								value={formik.values.firstName}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.firstName && Boolean(formik.errors.firstName)}
								helperText={formik.touched.firstName && formik.errors.firstName}
							/>
							<TextField
								datafieldname="lastName"
								fullWidth
								id="lastName"
								name="lastName"
								type="text"
								placeholder="Please enter your last name"
								variant="outlined"
								value={formik.values.lastName}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.lastName && Boolean(formik.errors.lastName)}
								helperText={formik.touched.lastName && formik.errors.lastName}
							/>
						</Box>
					</RowInputLabelContainer>
					<RowInputLabelContainer
						label="Your profile photo"
						labelWrap={false}
						alignLabel="start"
						labelMinWidth="240px"
					>
						<Box className="f f-c g8 w100" maxWidth="502px" datafieldname="file">
							<Box className="f align-center g24">
								<Avatar
									sx={STYLES.pic}
									alt="your profile pic"
									src={
										formik.values.file
											? formik.values.file.hasOwnProperty("change")
												? formik.values.file.name
												: URL.createObjectURL(formik.values.file)
											: profilePic
									}
								/>
								<Box className="f align-center g8 flex-wrap">
									<input
										style={{ display: "none" }}
										id="file"
										name="file"
										accept="image/jpeg,image/png,image/jpg"
										type="file"
										ref={fileRef}
										onChange={(event) => {
											handleFileUpload(event)
										}}
									/>
									<Button
										id="survey_profile_pic_upload"
										className="track_button"
										sx={STYLES.picUpload}
										variant="contained"
										color="purple"
										onClick={() => {
											fileRef.current.click()
											formik.setFieldTouched("file", true)
										}}
									>
										<FiUploadCloud size="20px" /> Upload profile photo
									</Button>
									<IconButton
										id="survey_profile_pic_dlt"
										className="track_button"
										sx={STYLES.picDlt}
										onClick={() => {
											fileRef.current.value = null
											formik.setFieldValue("file", null)
											formik.setFieldValue("isProfileDeleted", true)
										}}
									>
										<FiTrash2 size="20px" />
									</IconButton>
								</Box>
							</Box>
							{formik.touched.file && Boolean(formik.errors.file) ? (
								<FormHelperText>{formik.touched.file && formik.errors.file}</FormHelperText>
							) : null}
						</Box>
					</RowInputLabelContainer>
					<RowInputLabelContainer label="Pronouns" labelWrap={false} alignLabel="start" labelMinWidth="240px">
						<Box className="f f-c g8 w100" maxWidth="502px" datafieldname="pronouns">
							{proLoading ? (
								<Skeleton height="80px" />
							) : (
								<>
									<CheckBoxGrid
										data={proData}
										state={formik.values.pronouns}
										setState={(value) => {
											let data
											if (value !== "I prefer not to answer") {
												data = _.xor(formik.values.pronouns, [value])
												data = _.without(data, "I prefer not to answer")
											} else {
												data = formik.values.pronouns.includes("I prefer not to answer")
													? []
													: ["I prefer not to answer"]
											}
											formik.setFieldValue("pronouns", data)
										}}
									/>
									{formik.touched.pronouns && Boolean(formik.errors.pronouns) ? (
										<FormHelperText>
											{formik.touched.pronouns && formik.errors.pronouns}
										</FormHelperText>
									) : null}
								</>
							)}
						</Box>
					</RowInputLabelContainer>
					{formik.values.pronouns.includes("Additional") ? (
						<RowInputLabelContainer
							label="Additional pronouns"
							labelWrap={false}
							alignLabel="start"
							labelMinWidth="240px"
						>
							<Box className="w100" maxWidth="502px" datafieldname="additionalPronouns">
								<TextField
									datafieldname="additionalPronouns"
									fullWidth
									id="additionalPronouns"
									name="additionalPronouns"
									type="text"
									placeholder="Please enter additional pronoun"
									variant="outlined"
									value={formik.values.additionalPronouns}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.additionalPronouns && Boolean(formik.errors.additionalPronouns)
									}
									helperText={formik.touched.additionalPronouns && formik.errors.additionalPronouns}
								/>
							</Box>
						</RowInputLabelContainer>
					) : null}
					<RowInputLabelContainer label="Gender" labelWrap={false} alignLabel="start" labelMinWidth="240px">
						<Box className="f f-c g8 w100" maxWidth="502px" datafieldname="gender">
							{genderLoading ? (
								<Skeleton height="80px" />
							) : (
								<>
									<CheckBoxGrid
										data={genderData}
										state={formik.values.gender}
										setState={(value) => {
											let data
											if (value !== "I prefer not to answer") {
												data = _.xor(formik.values.gender, [value])
												data = _.without(data, "I prefer not to answer")
											} else {
												data = formik.values.gender.includes("I prefer not to answer")
													? []
													: ["I prefer not to answer"]
											}
											formik.setFieldValue("gender", data)
										}}
									/>
									{formik.touched.gender && Boolean(formik.errors.gender) ? (
										<FormHelperText>{formik.touched.gender && formik.errors.gender}</FormHelperText>
									) : null}
								</>
							)}
						</Box>
					</RowInputLabelContainer>
					{formik.values.gender.includes("Additional") ? (
						<RowInputLabelContainer
							label="Additional gender"
							labelWrap={false}
							alignLabel="start"
							labelMinWidth="240px"
						>
							<Box className="w100" maxWidth="502px" datafieldname="additionalGender">
								<TextField
									datafieldname="additionalGender"
									fullWidth
									id="additionalGender"
									name="additionalGender"
									type="text"
									placeholder="Please enter additional gender"
									variant="outlined"
									value={formik.values.additionalGender}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.additionalGender && Boolean(formik.errors.additionalGender)}
									helperText={formik.touched.additionalGender && formik.errors.additionalGender}
								/>
							</Box>
						</RowInputLabelContainer>
					) : null}
					<RowInputLabelContainer
						label="Transgender"
						labelWrap={false}
						alignLabel="start"
						labelMinWidth="240px"
					>
						<Box className="w100" maxWidth="502px" datafieldname="transgender">
							<CustomSelect
								value={{
									value: formik.values.transgender,
									label: (() => {
										const { transgender } = formik.values
										if (transgender === "PREFER_NOT_TO_ANSWER") return "Prefer not to answer"
										return transgender
											? transgender.charAt(0) + transgender.slice(1).toLowerCase()
											: ""
									})(),
								}}
								placeholder="Select"
								options={[
									{ value: "YES", label: "Yes" },
									{ value: "NO", label: "No" },
									{ value: "PREFER_NOT_TO_ANSWER", label: "Prefer not to answer" },
								]}
								meta={{ error: formik.errors.transgender, touched: formik.touched.transgender }}
								name="transgender"
								onBlur={() => formik.setFieldTouched("transgender", true)}
								onChange={async (value) => {
									await formik.setFieldValue("transgender", value.value)
									formik.validateField("transgender")
								}}
							/>
						</Box>
					</RowInputLabelContainer>
					<RowInputLabelContainer
						label="Race or ethinicity"
						labelWrap={false}
						alignLabel="start"
						labelMinWidth="240px"
					>
						<Box className="f f-c g8 w100" maxWidth="502px" datafieldname="race">
							<CheckBoxGrid
								data={Object.keys(RACE_OPTIONS)}
								state={formik.values.race}
								setState={(value) => formik.setFieldValue("race", _.xor(formik.values.race, [value]))}
							/>
							{formik.touched.race && Boolean(formik.errors.race) ? (
								<FormHelperText>{formik.touched.race && formik.errors.race}</FormHelperText>
							) : null}
						</Box>
					</RowInputLabelContainer>
					<RowInputLabelContainer
						label="Identify as LGBTQIA+?"
						labelWrap={false}
						alignLabel="start"
						labelMinWidth="240px"
					>
						<Box className="w100" maxWidth="502px" datafieldname="LGBTQIA">
							<CustomSelect
								value={{
									value: formik.values.LGBTQIA,
									label: (() => {
										const { LGBTQIA } = formik.values
										if (LGBTQIA === "PREFER_NOT_TO_ANSWER") return "Prefer not to answer"
										return LGBTQIA ? LGBTQIA.charAt(0) + LGBTQIA.slice(1).toLowerCase() : ""
									})(),
								}}
								placeholder="Select"
								options={[
									{ value: "YES", label: "Yes" },
									{ value: "NO", label: "No" },
									{ value: "PREFER_NOT_TO_ANSWER", label: "Prefer not to answer" },
								]}
								meta={{ error: formik.errors.LGBTQIA, touched: formik.touched.LGBTQIA }}
								name="LGBTQIA"
								onBlur={() => formik.setFieldTouched("LGBTQIA", true)}
								onChange={async (value) => {
									await formik.setFieldValue("LGBTQIA", value.value)
									formik.validateField("LGBTQIA")
								}}
							/>
						</Box>
					</RowInputLabelContainer>
					<RowInputLabelContainer
						label="Language(s)"
						labelHelper="Select languages other than english in which you provide care."
						labelWrap={false}
						alignLabel="start"
						labelMinWidth="240px"
					>
						<Box className="f f-c g8 w100" maxWidth="502px" datafieldname="language">
							{langloading ? (
								<Skeleton height="80px" />
							) : (
								<>
									<CheckBoxGrid
										data={langData}
										state={formik.values.language}
										setState={(value) =>
											formik.setFieldValue("language", _.xor(formik.values.language, [value]))
										}
									/>
									{formik.touched.language && Boolean(formik.errors.language) ? (
										<FormHelperText>
											{formik.touched.language && formik.errors.language}
										</FormHelperText>
									) : null}
								</>
							)}
						</Box>
					</RowInputLabelContainer>
					{formik.values.language.includes("Other") ? (
						<RowInputLabelContainer
							label="Other language"
							labelWrap={false}
							alignLabel="start"
							labelMinWidth="240px"
						>
							<Box className="w100" maxWidth="502px" datafieldname="otherLanguage">
								<TextField
									datafieldname="otherLanguage"
									fullWidth
									id="otherLanguage"
									name="otherLanguage"
									type="text"
									placeholder="Please enter other language"
									variant="outlined"
									value={formik.values.otherLanguage}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.otherLanguage && Boolean(formik.errors.otherLanguage)}
									helperText={formik.touched.otherLanguage && formik.errors.otherLanguage}
								/>
							</Box>
						</RowInputLabelContainer>
					) : null}
					<RowInputLabelContainer
						label="How many years have you been in practice?"
						alignLabel="start"
						forcelabelMinWidth="240px"
					>
						<Box className="f f-c g8 w100" maxWidth="502px" datafieldname="practiceYears">
							<CheckBoxGrid
								icon={<IoEllipseOutline size="24px" />}
								checkedIcon={<IoCheckmarkCircle size="24px" />}
								data={Object.keys(PRACTICE_YEARS_OPTIONS)}
								state={formik.values.practiceYears}
								setState={(value) => formik.setFieldValue("practiceYears", value)}
							/>
							{formik.touched.practiceYears && Boolean(formik.errors.practiceYears) ? (
								<FormHelperText>
									{formik.touched.practiceYears && formik.errors.practiceYears}
								</FormHelperText>
							) : null}
						</Box>
					</RowInputLabelContainer>
					<RowInputLabelContainer
						label="What is your age group?"
						alignLabel="start"
						forcelabelMinWidth="240px"
					>
						<Box className="f f-c g8 w100" maxWidth="502px" datafieldname="ageGroup">
							<CheckBoxGrid
								icon={<IoEllipseOutline size="24px" />}
								checkedIcon={<IoCheckmarkCircle size="24px" />}
								data={Object.keys(AGE_GROUP_OPTIONS)}
								state={formik.values.ageGroup}
								setState={(value) => formik.setFieldValue("ageGroup", value)}
							/>
							{formik.touched.ageGroup && Boolean(formik.errors.ageGroup) ? (
								<FormHelperText>{formik.touched.ageGroup && formik.errors.ageGroup}</FormHelperText>
							) : null}
						</Box>
					</RowInputLabelContainer>
				</Box>
			)}
		</form>
	)
}

export default SettingLayout
