import React from "react"
import { ScrollToFormError } from "../../../../../../helpers/FormErrorScroll"
import { Box, Checkbox, FormHelperText, TextField, Typography } from "@mui/material"
import Button from "../../../../../utilities/Button"
import RowInputLabelContainer from "../../../../../utilities/RowInputLabelContainer"
import Loading from "./loading/Loading"
import _ from "lodash"
import InputLabelContainer from "../../../../../utilities/InputLabelContainer"
import CustomSelect from "../../../../../utilities/Select"
import { FiSearch } from "react-icons/fi"
import CheckBoxGrid from "../../../PersonalInformation/widgets/CheckBoxGrid"

function SettingLayout({ formik, loading, sTData, sTLoading, pOData, pOLoading }) {
	return (
		<form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
			<ScrollToFormError formik={formik} />
			<Box
				className="f align-center justify-s-b g12 flex-wrap"
				padding="0px 0px 14px"
				borderBottom="1px solid #eaebf2"
			>
				<Typography color="#1B1C20" fontSize="18px" fontWeight="500" lineHeight="26px">
					Practice information
				</Typography>
				<Box className="f g12">
					<Button
						id="practice_information_discard"
						className="track_button"
						variant="outlined"
						color="purple"
						type="reset"
					>
						Discard
					</Button>
					<Button
						id="practice_information_update"
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
						label="Preferred setting to provide care"
						alignLabel="start"
						forcelabelMinWidth="240px"
					>
						<Box className="f f-c g8 w100" maxWidth="502px" datafieldname="providerCare">
							<Box className="f flex-wrap g24 w100">
								<Box className="f align-center  g12">
									<Checkbox
										value="inPerson"
										checked={formik.values.provideCare.includes("inPerson")}
										onBlur={() => formik.setFieldTouched("provideCare", true)}
										onChange={() =>
											formik.setFieldValue(
												"provideCare",
												_.xor(formik.values.provideCare, ["inPerson"]).sort()
											)
										}
									/>
									<Typography color="#1B1C20" fontSize="14px" fontWeight="400" lineHeight="20px">
										In-person
									</Typography>
								</Box>
								<Box className="f align-center  g12">
									<Checkbox
										value="virtual"
										checked={formik.values.provideCare.includes("virtual")}
										onBlur={() => formik.setFieldTouched("provideCare", true)}
										onChange={() =>
											formik.setFieldValue(
												"provideCare",
												_.xor(formik.values.provideCare, ["virtual"]).sort()
											)
										}
									/>
									<Typography color="#1B1C20" fontSize="14px" fontWeight="400" lineHeight="20px">
										Virtual
									</Typography>
								</Box>
								{formik.touched.provideCare && Boolean(formik.errors.provideCare) ? (
									<FormHelperText>
										{formik.touched.provideCare && formik.errors.provideCare}
									</FormHelperText>
								) : null}
							</Box>
						</Box>
					</RowInputLabelContainer>
					{formik.values.provideCare.includes("inPerson") ? (
						<RowInputLabelContainer
							label="Practice address for in-person setting"
							alignLabel="start"
							forcelabelMinWidth="240px"
						>
							<Box className="f f-c g12 w100" maxWidth="502px">
								<InputLabelContainer label="Practice name">
									<TextField
										datafieldname="practiceName"
										fullWidth
										id="practiceName"
										name="practiceName"
										type="text"
										placeholder="Please enter practice name"
										variant="outlined"
										value={formik.values.practiceName}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.practiceName && Boolean(formik.errors.practiceName)}
										helperText={formik.touched.practiceName && formik.errors.practiceName}
									/>
								</InputLabelContainer>
								<InputLabelContainer label="Address line 1">
									<TextField
										datafieldname="addressLine1"
										fullWidth
										id="addressLine1"
										name="addressLine1"
										type="text"
										placeholder="Please enter address line 1"
										variant="outlined"
										value={formik.values.addressLine1}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
										helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
									/>
								</InputLabelContainer>
								<InputLabelContainer label="Address line 2">
									<TextField
										datafieldname="addressLine2"
										fullWidth
										id="addressLine2"
										name="addressLine2"
										type="text"
										placeholder="Please enter address line 2"
										variant="outlined"
										value={formik.values.addressLine2}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.addressLine2 && Boolean(formik.errors.addressLine2)}
										helperText={formik.touched.addressLine2 && formik.errors.addressLine2}
									/>
								</InputLabelContainer>
								<InputLabelContainer label="State or province">
									<CustomSelect
										value={
											formik.values.state === ""
												? null
												: {
														value: formik.values.state,
														label: formik.values.state,
												  }
										}
										meta={{
											error: formik.errors.state,
											touched: formik.touched.state,
										}}
										placeholder="Select your state or province"
										options={sTData}
										isLoading={sTLoading}
										name="state"
										onBlur={() => formik.setFieldTouched("state", true)}
										onChange={async (value) => {
											await formik.setFieldValue("state", value.label)
											formik.validateField("state")
										}}
									/>
								</InputLabelContainer>
								<Box className="f g12">
									<InputLabelContainer label="City">
										<TextField
											datafieldname="city"
											fullWidth
											id="city"
											name="city"
											type="text"
											placeholder="Please enter address line 2"
											variant="outlined"
											value={formik.values.city}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={formik.touched.city && Boolean(formik.errors.city)}
											helperText={formik.touched.city && formik.errors.city}
										/>
									</InputLabelContainer>
									<InputLabelContainer label="Zip or postal">
										<TextField
											datafieldname="zipCode"
											fullWidth
											id="zipCode"
											name="zipCode"
											type="text"
											placeholder="Please enter address line 2"
											variant="outlined"
											value={formik.values.zipCode}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
											helperText={formik.touched.zipCode && formik.errors.zipCode}
										/>
									</InputLabelContainer>
								</Box>
								<Box className="f align-center g8" datafieldname="hideLocation">
									<Checkbox
										value={true}
										checked={formik.values.hideLocation}
										onBlur={() => formik.setFieldTouched("hideLocation", true)}
										onChange={() =>
											formik.setFieldValue("hideLocation", !formik.values.hideLocation)
										}
									/>
									<Typography color="#1B1C20" fontSize="14px" fontWeight="500" lineHeight="20px">
										Hide location on my listing
									</Typography>
								</Box>
							</Box>
						</RowInputLabelContainer>
					) : null}
					{formik.values.provideCare.includes("virtual") ? (
						<RowInputLabelContainer
							label="Virtual setting details"
							labelWrap={false}
							alignLabel="start"
							labelMinWidth="240px"
						>
							<Box className="w100" maxWidth="502px">
								<InputLabelContainer label="Licensed in following state(s)">
									<CustomSelect
										value={formik.values.stateLicensed}
										leftIcon={<FiSearch />}
										isMulti
										placeholder="Select your license state(s)"
										options={sTData}
										isLoading={sTLoading}
										meta={{
											error: formik.errors.stateLicensed,
											touched: formik.touched.stateLicensed,
										}}
										name="stateLicensed"
										onBlur={() => formik.setFieldTouched("stateLicensed", true)}
										onChange={async (value) => {
											await formik.setFieldValue("stateLicensed", value)
											formik.validateField("stateLicensed")
										}}
									/>
								</InputLabelContainer>
							</Box>
						</RowInputLabelContainer>
					) : null}
					<RowInputLabelContainer
						label="Practice website URL"
						labelWrap={false}
						alignLabel="start"
						labelMinWidth="240px"
					>
						<Box className="w100" maxWidth="502px">
							<TextField
								datafieldname="practiceURL"
								fullWidth
								id="practiceURL"
								name="practiceURL"
								type="text"
								placeholder="Please enter URL"
								variant="outlined"
								value={formik.values.practiceURL}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.practiceURL && Boolean(formik.errors.practiceURL)}
								helperText={formik.touched.practiceURL && formik.errors.practiceURL}
							/>
						</Box>
					</RowInputLabelContainer>
					<RowInputLabelContainer
						label="What payment or insurance types do you accept?"
						labelHelper="(Please select all that apply)"
						alignLabel="start"
						forcelabelMinWidth="240px"
					>
						<Box
							className="w100"
							maxWidth="502px"
							datafieldname="insurance"
							onBlur={() => formik.setFieldTouched("insurance", true)}
						>
							<CheckBoxGrid
								data={pOData}
								state={formik.values.insurance}
								setState={(value) =>
									formik.setFieldValue("insurance", _.xor(formik.values.insurance, [value]))
								}
							/>
							{formik.touched.insurance && Boolean(formik.errors.insurance) ? (
								<FormHelperText>{formik.touched.insurance && formik.errors.insurance}</FormHelperText>
							) : null}
						</Box>
					</RowInputLabelContainer>
					{formik.values.insurance.includes("Other") ? (
						<RowInputLabelContainer
							label="Other payment type"
							labelWrap={false}
							alignLabel="start"
							labelMinWidth="240px"
						>
							<Box className="w100" maxWidth="502px">
								<TextField
									datafieldname="otherInsurance"
									fullWidth
									id="otherInsurance"
									name="otherInsurance"
									type="text"
									placeholder="Please enter other payment type"
									variant="outlined"
									value={formik.values.otherInsurance}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.otherInsurance && Boolean(formik.errors.otherInsurance)}
									helperText={formik.touched.otherInsurance && formik.errors.otherInsurance}
								/>
							</Box>
						</RowInputLabelContainer>
					) : null}
					<RowInputLabelContainer
						label="How would you like patients to contact you?"
						labelHelper="(Please select all that apply)"
						alignLabel="start"
						forcelabelMinWidth="240px"
					>
						<Box
							datafieldname="contactYou"
							className="f f-c g12 w100"
							maxWidth="502px"
							onBlur={() => formik.setFieldTouched("contactYou", true)}
						>
							<Box className="f align-center g8">
								<Checkbox
									value="WEBSITE"
									checked={formik.values.contactYou.includes("WEBSITE")}
									onChange={() =>
										formik.setFieldValue(
											"contactYou",
											_.xor(formik.values.contactYou, ["WEBSITE"]).sort()
										)
									}
								/>
								<Typography color="#1B1C20" fontSize="14px" fontWeight="400" lineHeight="20px">
									Practice website
								</Typography>
							</Box>
							<Box className="f align-start g8">
								<Checkbox
									value="EMAIL"
									checked={formik.values.contactYou.includes("EMAIL")}
									onChange={() =>
										formik.setFieldValue(
											"contactYou",
											_.xor(formik.values.contactYou, ["EMAIL"]).sort()
										)
									}
								/>
								<Box className="f f-c g8 justify-center w100">
									<Typography color="#1B1C20" fontSize="14px" fontWeight="400" lineHeight="20px">
										Practice email
									</Typography>
									{formik.values.contactYou.includes("EMAIL") ? (
										<TextField
											datafieldname="practiceEmail"
											fullWidth
											id="practiceEmail"
											name="practiceEmail"
											type="text"
											placeholder="Please enter practice email"
											variant="outlined"
											value={formik.values.practiceEmail}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={formik.touched.practiceEmail && Boolean(formik.errors.practiceEmail)}
											helperText={formik.touched.practiceEmail && formik.errors.practiceEmail}
										/>
									) : null}
								</Box>
							</Box>
							<Box className="f align-start g8">
								<Checkbox
									value="PHONE"
									checked={formik.values.contactYou.includes("PHONE")}
									onChange={() =>
										formik.setFieldValue(
											"contactYou",
											_.xor(formik.values.contactYou, ["PHONE"]).sort()
										)
									}
								/>
								<Box className="f f-c g8 w100 justify-center">
									<Typography color="#1B1C20" fontSize="14px" fontWeight="400" lineHeight="20px">
										Practice phone
									</Typography>
									{formik.values.contactYou.includes("PHONE") ? (
										<TextField
											datafieldname="practicePhone"
											fullWidth
											id="practicePhone"
											name="practicePhone"
											type="text"
											placeholder="Please enter practice phone"
											variant="outlined"
											value={formik.values.practicePhone}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={formik.touched.practicePhone && Boolean(formik.errors.practicePhone)}
											helperText={formik.touched.practicePhone && formik.errors.practicePhone}
										/>
									) : null}
								</Box>
							</Box>
							{formik.touched.contactYou && Boolean(formik.errors.contactYou) ? (
								<FormHelperText>{formik.touched.contactYou && formik.errors.contactYou}</FormHelperText>
							) : null}
						</Box>
					</RowInputLabelContainer>
				</Box>
			)}
		</form>
	)
}

export default SettingLayout
