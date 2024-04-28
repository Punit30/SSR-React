import { useLazyQuery } from "@apollo/client"
import _ from "lodash"
import { useSnackbar } from "notistack"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCreditTypeListQuery } from "../../gql/queries/CreditType"
import { setCreditType } from "../../app/GlobalObjects/store/reducers/Data"

const useCreditType = () => {
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const storedData = useSelector((state) => state.dataReducer.creditType)
	const [loading, setLoading] = useState(false)

	const [Query] = useLazyQuery(getCreditTypeListQuery, {
		fetchPolicy: "network-only",
		onCompleted: (data) => {
			const list = _.map(data.getCreditTypeList, (item) => ({
				id: item.id,
				name: item.name,
			}))
			const sortedData = _.sortBy(list, "name")
			dispatch(setCreditType({ data: sortedData, lastUpdated: Date.now() }))
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
export default useCreditType
