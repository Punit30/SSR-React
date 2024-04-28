import classnames from "classnames"
import React from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import styled from "styled-components"
import { DOTS, usePagination } from "../../helpers/hooks/usePagination"

const Pagination = (props) => {
	const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	})

	// If there are less than 2 times in pagination range we shall not render the component
	if (currentPage === 0 || paginationRange.length < 2) {
		return null
	}

	const onNext = () => {
		onPageChange(currentPage + 1)
	}

	const onPrevious = () => {
		onPageChange(currentPage - 1)
	}

	let lastPage = paginationRange[paginationRange.length - 1]
	return (
		<StyledPaginationContainer>
			<ul
				className={classnames("pagination_container", {
					[className]: className,
				})}
			>
				{/* Left navigation arrow */}
				<li
					className={classnames("pagination_item", {
						disabled: currentPage === 1,
					})}
					onClick={onPrevious}
				>
					<div className="pagination_action_button">
						<FiChevronLeft size="18px" /> <span className="collapase_560">Prev</span>
					</div>
				</li>
				{paginationRange.map((pageNumber, index) => {
					// If the pageItem is a DOT, render the DOTS unicode character
					if (pageNumber === DOTS) {
						return (
							<li className="pagination_item dots" key={index}>
								&#8230;
							</li>
						)
					}

					// Render our Page Pills
					return (
						<li
							className={classnames("pagination_item", {
								selected: pageNumber === currentPage,
							})}
							key={index}
							onClick={() => onPageChange(pageNumber)}
						>
							{pageNumber}
						</li>
					)
				})}
				{/*  Right Navigation arrow */}
				<li
					className={classnames("pagination_item", {
						disabled: currentPage === lastPage,
					})}
					onClick={onNext}
				>
					<div className="pagination_action_button">
						<span className="collapase_560">Next</span> <FiChevronRight size="18px" />
					</div>
				</li>
			</ul>
		</StyledPaginationContainer>
	)
}

const StyledPaginationContainer = styled.div`
	.pagination_container {
		display: flex;
		list-style-type: none;
		font-family: "Inter";
		margin: initial;

		.pagination_action_panel {
			display: flex;
		}

		.pagination_item {
			padding: 8px 12px;
			height: 32px;
			text-align: center;
			display: flex;
			margin: auto 2px;
			box-sizing: border-box;
			align-items: center;
			border: 1px solid transparent;
			border-radius: 4px;
			justify-content: center;
			min-width: 32px;

			font-weight: 400;
			font-size: 16px;
			line-height: 16px;
			color: #9a9cb0;

			@media only screen and (max-width: 560px) {
				margin: auto 0px;
				padding: 4px 8px;
			}

			.pagination_action_button {
				display: flex;
				align-items: center;
				gap: 2px;

				.collapase_560 {
					@media only screen and (max-width: 560px) {
						display: none;
					}
				}
			}

			&.dots:hover {
				background-color: transparent;
				cursor: default;
			}
			&:hover {
				background-color: rgba(0, 0, 0, 0.04);
				cursor: pointer;
			}

			&.selected {
				background: #f2edfc;
				border: 1px solid #814cd6;
				color: #814cd6;
			}

			&.disabled {
				pointer-events: none;

				.arrow::before {
					border-right: 0.12em solid rgba(0, 0, 0, 0.43);
					border-top: 0.12em solid rgba(0, 0, 0, 0.43);
				}

				&:hover {
					background-color: transparent;
					cursor: default;
				}
			}
		}
	}
`
export default Pagination
