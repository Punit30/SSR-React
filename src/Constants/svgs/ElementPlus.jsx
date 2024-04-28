import React from "react"
import PropTypes from "prop-types"

function ElementPlus({ color, size, opacity, logo }) {
	const colors =
		logo === true
			? {
					topRect: "#03BBFD",
					leftRect: "#FF449F",
					rightRect: "#93C216",
					bottomRect: "#FFCE2D",
					circle: "#B33CE3",
			  }
			: {
					topRect: color,
					leftRect: color,
					rightRect: color,
					bottomRect: color,
					circle: color,
			  }

	return (
		<svg width={size} height={size} viewBox="0 0 44 44" fill="none">
			<g opacity={opacity}>
				<rect width="11.4014" height="16.2877" transform="translate(16.2539)" fill={colors.topRect} />
				<rect
					width="11.4014"
					height="16.2877"
					transform="translate(44 16.2539) rotate(90)"
					fill={colors.rightRect}
				/>
				<rect
					width="11.4014"
					height="16.2877"
					transform="translate(16.2539 27.7119)"
					fill={colors.bottomRect}
				/>
				<rect
					width="11.4014"
					height="16.2877"
					transform="translate(16.2871 16.2539) rotate(90)"
					fill={colors.leftRect}
				/>
				<circle cx="22" cy="22" r="5.67" fill={colors.circle} />
			</g>
		</svg>
	)
}

ElementPlus.propTypes = {
	color: PropTypes.string,
	size: PropTypes.string,
	opacity: PropTypes.string,
	logo: PropTypes.bool,
}

ElementPlus.defaultProps = {
	color: "#EFE9FC",
	size: "177px",
	opacity: "100%",
	logo: true,
}

export default ElementPlus
