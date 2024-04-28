import React from "react"
import { styled } from "@mui/styles"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const MuiFormTracker = ({ trackForms }) => {
	const trackFromComp = (
		<StyledContainer>
			{trackForms &&
				trackForms.length > 0 &&
				trackForms.map((trackFrom) => (
					<div
						key={trackFrom.id}
						id={trackFrom.formId}
						className={`track_form_${trackFrom.variant} container_tag`}
					/>
				))}
		</StyledContainer>
	)
	return trackFromComp
}

const StyledContainer = styled("div")(() => ({
	position: "fixed",
	top: "100px",
	zIndex: "9999",
	pointerEvents: "none",

	"& .container_tag": {
		background: "red",
		width: "40px",
		height: "40px",
	},
}))

MuiFormTracker.propTypes = {
	trackForms: PropTypes.array,
}

const mapStateToProps = (state) => ({
	trackForms: state.trackFormsReducer,
})

export default connect(mapStateToProps)(MuiFormTracker)
