import { useFormikContext } from "formik"
import { useEffect } from "react"

export const getFieldErrorNames = (formikErrors) => {
	const transformObjectToDotNotation = (obj, prefix = "", result = []) => {
		Object.keys(obj).forEach((key) => {
			const value = obj[key]
			if (!value) return
			const nextKey = prefix ? `${prefix}.${key}` : key
			if (typeof value === "object") {
				transformObjectToDotNotation(value, nextKey, result)
			} else {
				result.push(nextKey)
			}
		})
		return result
	}
	return transformObjectToDotNotation(formikErrors)
}

export const ScrollToFormError = ({ formik }) => {
	const { submitCount, isValid, errors } = formik

	useEffect(() => {
		if (isValid) return

		const fieldErrorNames = getFieldErrorNames(errors)

		if (fieldErrorNames.length <= 0) return

		const element = document.querySelector(`[datafieldname='${fieldErrorNames[0]}']`)

		if (!element) return
		// Scroll to first known error into view
		element.scrollIntoView({ behavior: "smooth", block: "center" })
	}, [submitCount]) // eslint-disable-line react-hooks/exhaustive-deps

	return null
}
