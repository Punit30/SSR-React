import { Box, FormHelperText, IconButton, Skeleton, TextField, Typography } from "@mui/material"
import React from "react"
import { FiEye, FiFileText, FiSearch, FiTrash2, FiUploadCloud } from "react-icons/fi"
import { Link } from "react-router-dom"
import Button from "../../../../../utilities/Button"
import RowInputLabelContainer from "../../../../../utilities/RowInputLabelContainer"
import CustomSelect from "../../../../../utilities/Select"
import CheckList from "../../widgets/CheckList"
import _ from "lodash"
import Loading from "./loading/Loading"
import { ScrollToFormError } from "../../../../../../helpers/FormErrorScroll"

function SettingLayout({
	fileRef,
	formik,
	loading,
	specData,
	specLoading,
	degData,
	degLoading,
	aSData,
	aSLoading,
	pGData,
	pGLoading,
	handleResumeDrop = () => {},
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
					Professional information
				</Typography>
				<Box className="f g12">
					<Button
						id="professional_information_discard"
						className="track_button"
						variant="outlined"
						color="purple"
						type="reset"
					>
						Discard
					</Button>
					<Button
						id="professional_information_update"
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
					<RowInputLabelContainer label="Degree" labelWrap={false} alignLabel="start" labelMinWidth="240px">
						<Box className="w100" maxWidth="502px" datafieldname="degree">
							<CustomSelect
								isLoading={degLoading}
								value={{
									value: formik.values.degree,
									label: formik.values.degree,
								}}
								placeholder="Select your degree"
								options={degData}
								meta={{ error: formik.errors.degree, touched: formik.touched.degree }}
								name="degree"
								onBlur={() => formik.setFieldTouched("degree", true)}
								onChange={async (value) => {
									await formik.setFieldValue("degree", value.value)
									formik.validateField("degree")
								}}
							/>
						</Box>
					</RowInputLabelContainer>
					<RowInputLabelContainer
						label="Specialty"
						labelWrap={false}
						alignLabel="start"
						labelMinWidth="240px"
					>
						<Box className="w100" maxWidth="502px" datafieldname="specialty">
							<CustomSelect
								isLoading={specLoading}
								isDisabled
								value={formik.values.specialty}
								lefticon={<FiSearch />}
								isMulti
								placeholder="Select your specialty"
								options={specData}
								meta={{ error: formik.errors.specialty, touched: formik.touched.specialty }}
								name="specialty"
								onBlur={() => formik.setFieldTouched("specialty", true)}
								onChange={async (value) => {
									await formik.setFieldValue("specialty", value)
									formik.validateField("specialty")
								}}
							/>
						</Box>
					</RowInputLabelContainer>
					<RowInputLabelContainer
						label="Do you provide any of these services?"
						alignLabel="start"
						forcelabelMinWidth="240px"
						labelHelper="(Please select all that apply)"
						labelWidth="100%"
						labelMaxWidth={{ xs: "none", sm: "240px" }}
					>
						<Box className="f f-c g8 w100" maxWidth="502px" datafieldname="additionalService">
							{aSLoading ? (
								<Skeleton height="112px" />
							) : (
								<>
									<CheckList
										data={aSData}
										state={formik.values.additionalService}
										setState={(value) =>
											formik.setFieldValue(
												"additionalService",
												_.xor(formik.values.additionalService, [value])
											)
										}
									/>
									{formik.touched.additionalService && Boolean(formik.errors.additionalService) ? (
										<FormHelperText>
											{formik.touched.additionalService && formik.errors.additionalService}
										</FormHelperText>
									) : null}
								</>
							)}
						</Box>
					</RowInputLabelContainer>
					<RowInputLabelContainer
						label="Do you have in-depth experience with any of these patient groups?"
						alignLabel="start"
						forcelabelMinWidth="240px"
						labelWidth="100%"
						labelHelper="(Please select all that apply)"
						labelMaxWidth={{ xs: "none", sm: "240px" }}
					>
						<Box className="f f-c g8 w100" maxWidth="502px" datafieldname="experience">
							{pGLoading ? (
								<Skeleton height="112px" />
							) : (
								<>
									<CheckList
										data={pGData}
										state={formik.values.experience}
										setState={(value) =>
											formik.setFieldValue("experience", _.xor(formik.values.experience, [value]))
										}
									/>
									{formik.touched.experience && Boolean(formik.errors.experience) ? (
										<FormHelperText>
											{formik.touched.experience && formik.errors.experience}
										</FormHelperText>
									) : null}
								</>
							)}
						</Box>
					</RowInputLabelContainer>
					{formik.values.experience.includes("Other") ? (
						<RowInputLabelContainer
							label="Additional patient group"
							labelWrap={false}
							alignLabel="start"
							labelMinWidth="240px"
						>
							<Box className="w100" maxWidth="502px" datafieldname="otherExperience">
								<TextField
									datafieldname="otherExperience"
									fullWidth
									id="otherExperience"
									name="otherExperience"
									type="text"
									placeholder="Please enter a patient group"
									variant="outlined"
									value={formik.values.otherExperience}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.otherExperience && Boolean(formik.errors.otherExperience)}
									helperText={formik.touched.otherExperience && formik.errors.otherExperience}
								/>
							</Box>
						</RowInputLabelContainer>
					) : null}
					<RowInputLabelContainer
						label="Short biography"
						labelWrap={false}
						alignLabel="start"
						labelMinWidth="240px"
					>
						<Box className="f f-c g8 w100" maxWidth="502px" datafieldname="biography">
							<textarea
								datafieldname="biography"
								id="biography"
								name="biography"
								className={`text-area w100 h100 font-s14 font-w400 line-h19 resize-vertical ${
									formik.touched.biography && Boolean(formik.errors.biography)
										? "text-area__error"
										: ""
								}`}
								style={{ height: "88px" }}
								placeholder="Add biography here"
								value={formik.values.biography}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.biography && Boolean(formik.errors.biography) ? (
								<FormHelperText>{formik.touched.biography && formik.errors.biography}</FormHelperText>
							) : null}
							<Typography fontWeight="400" fontSize="14px" lineHeight="20px" color="#717385">
								This will be visible on your profile.
							</Typography>
						</Box>
					</RowInputLabelContainer>
					<RowInputLabelContainer
						label="Upload CV"
						labelWrap={false}
						alignLabel="start"
						labelMinWidth="240px"
					>
						<Box className="f f-c g8 w100" maxWidth="502px" datafieldname="file">
							<input
								style={{ display: "none" }}
								id="file"
								name="file"
								accept="application/pdf"
								type="file"
								ref={fileRef}
								onChange={(event) => {
									formik.setFieldValue("resumeFile", event.currentTarget.files[0])
									formik.setFieldValue("isResumeDeleted", false)
								}}
							/>
							<Box
								className="f f-c g8"
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => handleResumeDrop(e, formik.setFieldValue)}
							>
								{formik.values.resumeFile ? (
									<Box
										className="f align-center justify-s-b g12 b-r8"
										border="1px solid #D9DAE6"
										padding="12px 16px"
									>
										<Box className="f align-center g8">
											<FiFileText size="20px" color="#9A9CB0" />
											<Typography
												color="#717385"
												fontSize="14px"
												fontWeight="400"
												lineHeight="20px"
											>
												{formik.values.resumeFile.name}
											</Typography>
										</Box>
										<Box className="f align-center g8">
											<IconButton
												id="profile_pic_upload_modal_file_dlt"
												className="track_button"
												sx={{ padding: "4px" }}
												LinkComponent={Link}
												to={
													formik.values.resumeFile
														? formik.values.resumeFile.hasOwnProperty("change")
															? formik.values.resumeFile["launchLink"]
															: URL.createObjectURL(formik.values.resumeFile)
														: ""
												}
												target="_blank"
											>
												<FiEye size="20px" color="#9A9CB0" />
											</IconButton>
											<IconButton
												id="profile_pic_upload_modal_file_dlt"
												className="track_button"
												sx={{ padding: "4px" }}
												onClick={() => {
													fileRef.current.value = null
													formik.setFieldValue("resumeFile", null)
													formik.setFieldValue("isResumeDeleted", true)
												}}
											>
												<FiTrash2 size="20px" color="#EF4444" />
											</IconButton>
										</Box>
									</Box>
								) : (
									<Box
										className="f f-c align-center justify-center g4 b-r8 cursor-pointer"
										padding="16px 24px"
										border="1px dashed #d9dae6"
										onClick={() => {
											fileRef.current.click()
											formik.setFieldTouched("resumeFile", true)
										}}
									>
										<Box
											className="f align-center justify-center p10 b-rhalf"
											border="6px solid #F9F5FF"
											sx={{ backgroundColor: "#F4EBFF" }}
										>
											<FiUploadCloud color="#814CD6" />
										</Box>
										<Box textAlign="center">
											<Typography
												color="#6941C6"
												display="inline"
												fontSize="14px"
												lineHeight="20px"
												fontWeight="500"
											>
												Click to upload
											</Typography>{" "}
											<Typography
												display="inline"
												color="#9A9CB0"
												fontSize="14px"
												fontWeight="400"
												lineHeight="20px"
											>
												or drag and drop
											</Typography>
										</Box>
										<Typography color="#717385" fontSize="12px" fontWeight="400" lineHeight="18px">
											PDF
										</Typography>
									</Box>
								)}
								{formik.touched.resumeFile && Boolean(formik.errors.resumeFile) ? (
									<FormHelperText>
										{formik.touched.resumeFile && formik.errors.resumeFile}
									</FormHelperText>
								) : null}
								<Typography fontWeight="400" fontSize="14px" lineHeight="20px" color="#717385">
									This will not be visible to patients.
								</Typography>
							</Box>
						</Box>
					</RowInputLabelContainer>
				</Box>
			)}
		</form>
	)
}

export default SettingLayout
