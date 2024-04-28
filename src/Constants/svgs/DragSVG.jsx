import React from "react"

function DragSVG({ color = "currentColor" }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
			<g clipPath="url(#clip0_5855_383)">
				<path
					d="M8.25 13.5C8.25 14.325 7.575 15 6.75 15C5.925 15 5.25 14.325 5.25 13.5C5.25 12.675 5.925 12 6.75 12C7.575 12 8.25 12.675 8.25 13.5ZM6.75 7.5C5.925 7.5 5.25 8.175 5.25 9C5.25 9.825 5.925 10.5 6.75 10.5C7.575 10.5 8.25 9.825 8.25 9C8.25 8.175 7.575 7.5 6.75 7.5ZM6.75 3C5.925 3 5.25 3.675 5.25 4.5C5.25 5.325 5.925 6 6.75 6C7.575 6 8.25 5.325 8.25 4.5C8.25 3.675 7.575 3 6.75 3ZM11.25 6C12.075 6 12.75 5.325 12.75 4.5C12.75 3.675 12.075 3 11.25 3C10.425 3 9.75 3.675 9.75 4.5C9.75 5.325 10.425 6 11.25 6ZM11.25 7.5C10.425 7.5 9.75 8.175 9.75 9C9.75 9.825 10.425 10.5 11.25 10.5C12.075 10.5 12.75 9.825 12.75 9C12.75 8.175 12.075 7.5 11.25 7.5ZM11.25 12C10.425 12 9.75 12.675 9.75 13.5C9.75 14.325 10.425 15 11.25 15C12.075 15 12.75 14.325 12.75 13.5C12.75 12.675 12.075 12 11.25 12Z"
					fill={color}
				/>
			</g>
			<defs>
				<clipPath id="clip0_5855_383">
					<rect width="18" height="18" fill="white" />
				</clipPath>
			</defs>
		</svg>
	)
}

export default DragSVG