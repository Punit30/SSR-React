import { useLazyQuery, useMutation } from "@apollo/client"
import { CssBaseline } from "@mui/material"
import { useFormik } from "formik"
import _ from "lodash"
import React, { useEffect, useRef, useState } from "react"
import { connect, useDispatch } from "react-redux"
import {
	AGE_GROUP_OPTIONS,
	PRACTICE_YEARS_OPTIONS,
	RACE_OPTIONS,
} from "../../../../Constants/data-types/provider-formats"
import {
	addOrUpdateProviderPersonalDetailMutation,
	addOrUpdateUserProfilePicMutation,
} from "../../../../gql/mutations/Providers/ForProvider"
import { getProviderPersonalDetailQuery } from "../../../../gql/queries/Providers"
import { IPreferEndMove } from "../../../../helpers/HelpFuncs"
import useGender from "../../../../helpers/hooks/useGender"
import useLanguage from "../../../../helpers/hooks/useLanguage"
import usePronouns from "../../../../helpers/hooks/usePronouns"
import { setUser } from "../../../../app/GlobalObjects/store/reducers/User"
import ImageCropper from "../../../utilities/ImageCropper"
import ProfileStartLayout from "./layouts/ProfileStartLayout"
import SettingLayout from "./layouts/SettingLayout"
import validationSchema from "./validations/validation"
import { TrackForm } from "../../../../app/GlobalObjects/store/actions/TrackForm"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"

const INITIAL_VALUES = {
	firstName: "",
	lastName: "",
	file: null,
	pronouns: [],
	additionalPronouns: "",
	gender: [],
	additionalGender: "",
	race: [],
	language: "",
	otherLanguage: "",
	LGBTQIA: "",
	transgender: "",
	isProfileDeleted: false,
	ageGroup: "",
	practiceYears: "",
}

function PersonalInformationForm({ id, type }) {
	const { enqueueSnackbar } = useSnackbar()
	const navigate = useNavigate()
	const fileRef = useRef()
	const dispatch = useDispatch()
	const [initialValues, setInitialValues] = useState(_.cloneDeep(INITIAL_VALUES))

	const [image, setImage] = useState("")
	const [cropOpen, setCropOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const { data: genderData, loading: genderLoading } = useGender()
	const { data: langData, loading: langLoading } = useLanguage()
	const { data: proData, loading: proLoading } = usePronouns()

	const [GetPersonalDetail] = useLazyQuery(getProviderPersonalDetailQuery, {
		variables: { providerId: id },
		fetchPolicy: "network-only",
	})
	const [AddUpdatePersonalDetail] = useMutation(addOrUpdateProviderPersonalDetailMutation)
	const [AddUpdateProfilePic] = useMutation(addOrUpdateUserProfilePicMutation)

	const formik = useFormik({
		initialValues: initialValues,
		enableReinitialize: true,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				const {
					pronouns,
					additionalPronouns,
					gender,
					additionalGender,
					race,
					language,
					otherLanguage,
					isProfileDeleted,
					practiceYears,
					ageGroup,
					file,
					LGBTQIA,
					transgender,
				} = values

				const filteredPronouns = _.filter(pronouns, (item) => item !== "Additional")
				const filteredGender = _.filter(gender, (item) => item !== "Additional")
				const filteredLanguage = _.filter(language, (item) => item !== "Other")

				const [personalDetailRes, userProfileRes] = await Promise.all([
					AddUpdatePersonalDetail({
						variables: {
							firstName: values.firstName,
							lastName: values.lastName,
							pronouns: { pronouns: filteredPronouns, otherPronouns: additionalPronouns },
							gender: { genders: filteredGender, otherGenders: additionalGender },
							isLGBTQIA: LGBTQIA,
							isTransgender: transgender,
							ethnicity: race.map((item) => RACE_OPTIONS[item]),
							languages: { languages: filteredLanguage, otherLanguages: [otherLanguage] },
							isProfileDeleted,
							practiceYears: PRACTICE_YEARS_OPTIONS[practiceYears],
							ageGroup: AGE_GROUP_OPTIONS[ageGroup],
						},
					}),
					file !== null && !file.hasOwnProperty("change")
						? AddUpdateProfilePic({ variables: { userId: Number(id) } })
						: Promise.resolve(),
				])


				if (file !== null && !file.hasOwnProperty("change")) {
					const uploadLink = userProfileRes.data.addOrUpdateUserProfilePic.launchLink
					await fetch(uploadLink, { method: "PUT", body: file })
				}

				if (type === "settings") {
					fetchData()
					enqueueSnackbar("Your profile has been updated successfully.", {
						variant: "mui-alert",
						color: "success",
					})
				} else {
					navigate("/provider/profile-form/professional")
				}

				TrackForm({ formId: "personal_info_submit_form", variant: "success" })
			} catch (e) {
				TrackForm({ formId: "personal_info_submit_form", variant: "danger" })
				enqueueSnackbar("Submission failed. Please try again.", { variant: "mui-alert", color: "error" })
			}
		},
	})

	const handleFileUpload = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader()
			reader.readAsDataURL(event.target.files[0])
			reader.onload = function (e) {
				setImage(reader.result)
			}
			setCropOpen(true)
		}
	}

	const imageCompression = (canvas) => {
		return new Promise((resolve) => {
			canvas.toBlob((file) => resolve(file), "image/webp", 0.4)
		})
	}

	const onCropDone = (imgCroppedArea) => {
		const canvasEle = document.createElement("canvas")
		canvasEle.width = imgCroppedArea.width
		canvasEle.height = imgCroppedArea.height

		const context = canvasEle.getContext("2d")

		let imageObj1 = new Image()
		imageObj1.src = image
		imageObj1.onload = async function () {
			context.drawImage(
				imageObj1,
				imgCroppedArea.x,
				imgCroppedArea.y,
				imgCroppedArea.width,
				imgCroppedArea.height,
				0,
				0,
				imgCroppedArea.width,
				imgCroppedArea.height
			)

			const dataURL = await imageCompression(canvasEle)
			formik.setFieldValue("file", dataURL)
			formik.validateField("file")
		}
		setCropOpen(false)
		fileRef.current.value = null
	}

	const onCropCancel = () => {
		fileRef.current.value = null
		setImage("")
		setCropOpen(false)
	}

	const fetchData = async () => {
		setLoading(true)

		const res = (await GetPersonalDetail()).data.getProviderPersonalDetail

		const ini_val = {
			firstName: res.firstName,
			lastName: res.lastName,
			file: res.profilePicUrl
				? {
						name: res.profilePicUrl,
						type: "image/png",
						change: false,
				  }
				: null,
			pronouns: _.cloneDeep(res.pronouns ?? []),
			additionalPronouns: res.otherPronouns[0] ?? "",
			gender: _.cloneDeep(res.genders ?? []),
			additionalGender: res.otherGenders[0] ?? "",
			race: res.ethnicity.map((item) =>
				item
					.split("_")
					.map((i) => i.charAt(0).toUpperCase() + i.slice(1).toLowerCase())
					.join(" ")
			),
			language: _.cloneDeep(res.languages ?? []),
			otherLanguage: res.otherLanguages[0] ?? "",
			LGBTQIA: res.isLGBTQIA ?? "",
			transgender: res.isTransgender ?? "",
			ageGroup: _.invert(AGE_GROUP_OPTIONS)[res.ageGroup] ?? "",
			practiceYears: _.invert(PRACTICE_YEARS_OPTIONS)[res.practiceYears] ?? "",
		}

		if (res.otherPronouns[0]) ini_val.pronouns.push("Additional")
		if (res.otherGenders[0]) ini_val.gender.push("Additional")
		if (res.otherLanguages[0]) ini_val.language.push("Other")

		dispatch(
			setUser({
				firstName: res.firstName,
				lastName: res.lastName,
				profilePic: res.profilePicUrl ?? "",
			})
		)

		setInitialValues(ini_val)
		formik.resetForm()
		setTimeout(() => setLoading(false), 1000)
	}

	useEffect(() => {
		fetchData()
	}, [])

	const attirbutes = {
		fileRef: fileRef,
		formik: formik,
		loading: loading,
		handleFileUpload: handleFileUpload,
		genderData: [...IPreferEndMove(_.cloneDeep(genderData)), "Additional"],
		genderLoading: genderLoading,
		langData: [...langData, "Other"],
		langLoading: langLoading,
		proData: [...IPreferEndMove(_.cloneDeep(proData)), "Additional"],
		proLoading: proLoading,
	}

	return (
		<>
			<CssBaseline />
			<ImageCropper open={cropOpen} image={image} onCropDone={onCropDone} onCropCancel={onCropCancel} />
			{type === "settings" ? <SettingLayout {...attirbutes} /> : <ProfileStartLayout {...attirbutes} />}
		</>
	)
}

const mapStateToProps = (state) => ({
	id: state.local.providerReducer.providerId,
})

export default connect(mapStateToProps)(PersonalInformationForm)
