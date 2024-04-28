import { v4 as uuid } from "uuid"
import store from "../store"
import { removeTracking, setTracking } from "../reducers/GAFormTracker"

export const TrackForm = ({ formId = "", variant }) => {
	const id = uuid()
	store.dispatch(
		setTracking({
			variant: variant,
			id: id,
			formId: formId,
		})
	)
	setTimeout(() => store.dispatch(removeTracking(id)), 7500)
}
