import { useLazyQuery, useMutation } from "@apollo/client"
import { CssBaseline } from "@mui/material"
import { useFormik } from "formik"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { connect, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
	addOrUpdateProviderPracticeInformationMutation,
	markSurveyCompletionMutation,
} from "../../../../gql/mutations/Providers/ForProvider"
import { getProviderPracticeDetailQuery } from "../../../../gql/queries/Providers"
import usePaymentOption from "../../../../helpers/hooks/usePaymentOption"
import useStates from "../../../../helpers/hooks/useState"
import { TrackForm } from "../../../../app/GlobalObjects/store/actions/TrackForm"
import { setProvider } from "../../../../app/GlobalObjects/store/reducers/provider/Provider"
import ProfileStartLayout from "./layout/ProfileStartLayout"
import SettingLayout from "./layout/SettingLayout"
import validationSchema from "./validations/validation"

const INITIAL_VALUES = {
	provideCare: [],
	practiceName: "",
	addressLine1: "",
	addressLine2: "",
	state: "",
	city: "",
	zipCode: "",
	hideLocation: false,
	stateLicensed: [],
	practiceURL: "",
	insurance: [],
	otherInsurance: "",
	contactYou: [],
	practiceEmail: "",
	practicePhone: "",
}

function PracticeInformationForm({ id, type }) {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const [initialValues, setInitialValues] = useState(_.cloneDeep(INITIAL_VALUES))
	const [loading, setLoading] = useState(false)

	const { data: sTData, loading: sTLoading } = useStates()
	const { data: pOData, loading: pOLoading } = usePaymentOption()

	const [GetPracticeDetail] = useLazyQuery(getProviderPracticeDetailQuery, {
		variables: { providerId: id },
		fetchPolicy: "network-only",
	})

	const [AddUpdatePracticeInformation] = useMutation(addOrUpdateProviderPracticeInformationMutation)
	const [MarkSurveyCompletion] = useMutation(markSurveyCompletionMutation)

	const formik = useFormik({
		initialValues: initialValues,
		enableReinitialize: true,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				const payload = {
					acceptsInPerson: _.includes(values.provideCare, "inPerson"),
					acceptsInVirtual: _.includes(values.provideCare, "virtual"),
					practiceName: values.practiceName,
					addressLine1: values.addressLine1,
					addressLine2: values.addressLine2,
					city: values.city,
					state: values.state,
					zipCode: values.zipCode,
					hideLocation: values.hideLocation,
					states: _.map(values.stateLicensed, "value"),
					practiceUrl: values.practiceURL,
					preferenceInput: _.map(values.contactYou, (item) => ({
						preferenceType: item,
						value: values[
							item === "WEBSITE" ? "practiceURL" : item === "EMAIL" ? "practiceEmail" : "practicePhone"
						],
					})),
					payment: {
						payments: _.without(values.insurance, "Other"),
						otherPayments: values.insurance.includes("Other") ? values.otherInsurance : "",
					},
				}

				await AddUpdatePracticeInformation({ variables: payload })

				if (type === "settings") {
					setInitialValues(values)
					formik.resetForm()
					enqueueSnackbar("Your profile has been updated successfully.", {
						variant: "mui-alert",
						color: "success",
					})
				} else {
					await MarkSurveyCompletion()
					navigate("/dashboard/provider")
					dispatch(setProvider({ hasCompletedSurvey: true }))
				}
				TrackForm({ formId: "provider_setting_practice_info_form_submit", variant: "success" })
			} catch (e) {
				TrackForm({ formId: "provider_setting_practice_info_form_submit", variant: "danger" })
				enqueueSnackbar("Submission failed. Please try again.", { variant: "mui-alert", color: "error" })
			}
		},
	})

	const fetchData = async () => {
		setLoading(true)

		let ini_val = _.cloneDeep(INITIAL_VALUES)
		const res = (await GetPracticeDetail()).data.getProviderPracticeDetail

		const processInPersonDetail = (detail) => {
			ini_val["provideCare"].push("inPerson")
			Array("practiceName", "addressLine1", "addressLine2", "state", "city", "zipCode", "hideLocation").forEach(
				(key) => {
					ini_val[key] = detail[key]
				}
			)
		}

		const processVirtualDetail = (detail) => {
			ini_val["provideCare"].push("virtual")
			ini_val["stateLicensed"] = detail.states.map(({ name }) => ({ value: name, label: name }))
		}

		if (res["acceptsInPerson"]) {
			processInPersonDetail(res.inPersonDetail[0])
		}

		if (res["acceptsInVirtual"]) {
			processVirtualDetail(res.virtualPracticeDetail[0])
		}

		ini_val["practiceURL"] = res.practiceUrl || ""
		ini_val["insurance"] = [
			...res.paymentOption,
			...(Array.isArray(res.otherPaymentOption) && res.otherPaymentOption.length !== 0 ? ["Other"] : []),
		]
		ini_val["otherInsurance"] = res.otherPaymentOption[0] || ""

		res["preferenceDetail"].forEach(({ preferenceType, value }) => {
			ini_val["contactYou"].push(preferenceType)
			if (preferenceType === "EMAIL") {
				ini_val["practiceEmail"] = value
			}
			if (preferenceType === "PHONE") {
				ini_val["practicePhone"] = value
			}
		})

		setInitialValues(ini_val)
		formik.resetForm()
		setTimeout(() => setLoading(false), 1000)
	}

	useEffect(() => {
		fetchData()
	}, [])

	const attribute = {
		formik: formik,
		loading: loading,
		sTData: _.map(sTData, (state) => ({ value: state, label: state })),
		sTLoading: sTLoading,
		pOData: [...pOData, "Other"],
		pOLoading: pOLoading,
	}

	return (
		<>
			<CssBaseline />
			{type === "settings" ? <SettingLayout {...attribute} /> : <ProfileStartLayout {...attribute} />}
		</>
	)
}

const mapStateToProps = (state) => ({
	id: state.local.providerReducer.providerId,
})

export default connect(mapStateToProps)(PracticeInformationForm)
