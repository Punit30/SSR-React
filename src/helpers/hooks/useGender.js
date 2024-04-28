import { useLazyQuery } from "@apollo/client"
import _ from "lodash"
import { useSnackbar } from "notistack"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGenderListQuery } from "../../gql/queries/Gender"
import { setGender } from "../../app/GlobalObjects/store/reducers/Data"

const useGender = () => {
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const storedData = useSelector((state) => state.dataReducer.gender)
	const [loading, setLoading] = useState(false)

	const [Query] = useLazyQuery(getGenderListQuery, {
		fetchPolicy: "network-only",
		onCompleted: (data) => {
			dispatch(setGender({ data: data.getGenderList, lastUpdated: Date.now() }))
			setLoading(false)
		},
		onError: (error) => {
			_.forEach(_.get(error, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
			setLoading(false)
		},
	})

	const fetchData = useCallback(async () => {
		setLoading(true)
		Query()
	}, [Query])

	useEffect(() => {
		// fetch data is data is empty or older than 15 mins
		if (
			storedData.data.length === 0 ||
			storedData.lastUpdated === null ||
			(new Date() - new Date(storedData.lastUpdated)) / (1000 * 60) > 15
		) {
			fetchData()
		}
	}, [storedData, fetchData])

	return { data: storedData.data, loading, fetchData }
}
export default useGender
