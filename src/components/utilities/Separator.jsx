"use client"
import { styled } from "@mui/styles"
import PropTypes from "prop-types"

const Separator = styled("span")({
	display: "flex",
	height: "6px",
	borderRadius: "189px",
	width: (props) => props.width,
	background: (props) =>
		props.type == "large"
			? `linear-gradient(
					to right,
					#ffffff 8.3%,
					#f8cc2d 8.3% 16.6%,
					#ffafc8 16.6% 25%,
					#74d7ee 25% 33.3%,
					#613915 33.3% 41.6%,
					#ffffff 41.6% 50%,
					#e40303 50% 58.3%,
					#ff8c00 58.3% 66.6%,
					#ffed00 66.6% 75%,
					#008026 75% 83.3%,
					#24408e 83.3% 91.6%,
					#732982 91.6% 100%
				)`
			: `linear-gradient(
					to right,
					#ff449f 20%,
					#03bbfd 20% 40%,
					#96c41d 40% 60%,
					#ffcf2e 60% 80%,
					#b645e5 80% 100%
				)`,
})

Separator.propTypes = {
	width: PropTypes.string,
	type: PropTypes.string,
}

Separator.defaultProps = {
	width: "1145px",
	type: "large",
}

export default Separator
