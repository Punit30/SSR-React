import { useLazyQuery, useMutation } from "@apollo/client"
import { CssBaseline } from "@mui/material"
import { useFormik } from "formik"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import {
	addOrUpdateProviderProfessionalDetailMutation,
	addOrUpdateProviderResumeMutation,
} from "../../../../gql/mutations/Providers/ForProvider"
import { getProviderProfessionalDetailQuery, getResumeByIdQuery } from "../../../../gql/queries/Providers"
import useAdditionalServices from "../../../../helpers/hooks/useAdditionalServices"
import useDegree from "../../../../helpers/hooks/useDegree"
import usePatientGroup from "../../../../helpers/hooks/usePatientGroup"
import useSpecialty from "../../../../helpers/hooks/useSpecialty"
import { TrackForm } from "../../../../app/GlobalObjects/store/actions/TrackForm"
import ProfileStartLayout from "./layout/ProfileStartLayout"
import SettingLayout from "./layout/SettingLayout"
import validationSchema from "./validations/validation"
import { useNavigate } from "react-router-dom"

const INITIAL_VALUES = {
	degree: "",
	specialty: [],
	additionalService: [],
	experience: [],
	biography: "",
	resumeFile: null,
	otherExperience: "",
	isResumeDeleted: false,
}

function ProfessionalInformationForm({ id, type }) {
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar()
	const fileRef = useRef()
	const [loading, setLoading] = useState(false)
	const [initialValues, setInitialValues] = useState(_.cloneDeep(INITIAL_VALUES))

	const { data: specData, loading: specLoading } = useSpecialty()
	const { data: degData, loading: degLoading } = useDegree()
	const { data: aSData, loading: aSLoading } = useAdditionalServices()
	const { data: pGData, loading: pGLoading } = usePatientGroup()

	const [GetProfessionalDetail] = useLazyQuery(getProviderProfessionalDetailQuery, {
		variables: { providerId: id },
		fetchPolicy: "network-only",
	})
	const [GetResume] = useLazyQuery(getResumeByIdQuery, {
		variables: { userId: id },
		fetchPolicy: "network-only",
	})

	const [AddUpdateProfessionalDetail] = useMutation(addOrUpdateProviderProfessionalDetailMutation)
	const [AddUpdateResume] = useMutation(addOrUpdateProviderResumeMutation)

	const formik = useFormik({
		initialValues: initialValues,
		enableReinitialize: true,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				if (values.resumeFile && !values.resumeFile.change) {
					const resumeUpload = await AddUpdateResume({
						variables: { userId: id },
					})

					// File upload on S3 bucket
					await fetch(resumeUpload.data.addOrUpdateProviderResume.launchLink, {
						method: "PUT",
						body: values.resumeFile,
					})
				}

				const payload = {
					providerId: id,
					degree: [{ degreeType: values.degree || "" }],
					speciality: values.specialty.map((item) => ({ specialization: item.value })),
					additionalServices: values.additionalService.map((service) => ({ serviceName: service })),
					patientGroups: values.experience.map((item) =>
						item !== "Other" ? { groupName: item } : { other: values.otherExperience || "" }
					),
					aboutYou: values.biography || "",
					isResumeDeleted: values.isResumeDeleted || false,
				}

				await AddUpdateProfessionalDetail({
					variables: payload,
				})

				if (type === "settings") {
					setInitialValues(formik.values)
					formik.resetForm()
					enqueueSnackbar("Your profile has been updated successfully.", {
						variant: "mui-alert",
						color: "success",
					})
				} else {
					navigate("/provider/profile-form/practice")
				}

				TrackForm({ formId: "professional_info_submit_form", variant: "success" })
			} catch (error) {
				TrackForm({ formId: "professional_info_submit_form", variant: "danger" })
				enqueueSnackbar("Submission failed. Please try again.", { variant: "mui-alert", color: "error" })
			}
		},
	})

	const fetchData = async () => {
		setLoading(true)

		let res = await GetProfessionalDetail()
		let resumeRes = await GetResume()
		res = _.get(res, "data.getProviderProfessionalDetail", {})

		const {
			patientGroups,
			otherPatientGroups,
			primaryDegree,
			specialities,
			otherSpecialities,
			additionalServices,
			aboutYou,
		} = res

		const experience = _.map(patientGroups, "groupName")
		if (!_.isEmpty(otherPatientGroups)) {
			experience.push("Other")
		}

		const data = {
			degree: _.get(primaryDegree, "[0].degreeType", ""),
			specialty: [
				..._.map(specialities, (item) => ({
					value: item["specialization"],
					label: item["specialization"],
				})),
				..._.map(otherSpecialities, (item) => ({
					value: item["specialization"],
					label: `Other - ${item["specialization"]}`,
				})),
			],
			additionalService: _.map(additionalServices, "serviceName"),
			experience,
			otherExperience: _.isEmpty(otherPatientGroups) ? _.get(otherPatientGroups, "[0].groupName", "") : "",
			biography: aboutYou || "",
			resumeFile: _.get(resumeRes, "data.getResumeById.launchLink")
				? {
						name: "resume.pdf",
						type: "application/pdf",
						launchLink: _.get(resumeRes, "data.getResumeById.launchLink"),
						change: false,
				  }
				: null,
		}

		setInitialValues(data)
		formik.resetForm()
		setLoading(false)
	}

	useEffect(() => {
		fetchData()
	}, [])

	const handleResumeDrop = (e, setFieldValue) => {
		e.preventDefault()
		setFieldValue("resumeFile", e.dataTransfer.files[0])
	}

	const attributes = {
		fileRef: fileRef,
		formik: formik,
		loading: loading,
		handleResumeDrop: handleResumeDrop,
		specData: _.map(specData, (spec) => ({ value: spec.name, label: spec.name })),
		specLoading: specLoading,
		degData: _.map(degData, (deg) => ({ value: deg.name, label: deg.name })),
		degLoading: degLoading,
		aSData: _.map(aSData, (ad) => ad.name),
		aSLoading: aSLoading,
		pGData: [..._.map(pGData, (pg) => pg.name), "Other"],
		pGLoading: pGLoading,
	}

	return (
		<>
			<CssBaseline />
			{type === "settings" ? <SettingLayout {...attributes} /> : <ProfileStartLayout {...attributes} />}
		</>
	)
}

const mapStateToProps = (state) => ({
	id: state.local.providerReducer.providerId,
})

export default connect(mapStateToProps)(ProfessionalInformationForm)
