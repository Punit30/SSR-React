import { useEffect, useRef, useState } from "react"
import { Box, Checkbox, Typography } from "@mui/material"
import _ from "lodash"
import { FiSearch } from "react-icons/fi"
import styled, { css } from "styled-components"

const FilterDropDown = (props) => {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [searchInput, setSearchInput] = useState("")
	const filterRef = useRef(null)

	const [openPosition, setOpenPosition] = useState(
		css`
			left: 0px;
		`
	)

	const onClickOutside = () => {
		if (dropdownOpen) {
			setDropdownOpen(false)
			if (props.callback) {
				props.callback()
			}
		}
	}

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (filterRef.current && !filterRef.current.contains(event.target)) {
				onClickOutside && onClickOutside()
			}
		}

		document.addEventListener("click", handleClickOutside, true)
		return () => {
			document.removeEventListener("click", handleClickOutside, true)
		}
	}, [onClickOutside])

	const handleOpenPosition = (r, x, y) => {
		if (x > window.innerWidth - 282) {
			setOpenPosition(css`
				right: -${window.innerWidth - r - 10}px;
			`)
		} else {
			setOpenPosition(css`
				left: 0px;
			`)
		}
	}

	const handleDropdownOpen = (e) => {
		const pos = e.target.getBoundingClientRect()
		handleOpenPosition(pos.right, pos.x, pos.y)
		setDropdownOpen(true)
		setSearchInput("")
	}

	return (
		<SContainer ref={filterRef} openPosition={openPosition}>
			<div
				className={`filter_option ${props.state.length !== 0 || dropdownOpen ? "back_purple" : ""}`}
				onClick={handleDropdownOpen}
			>
				{props.title}
			</div>
			{dropdownOpen && (
				<div className="filter_menu">
					<Box padding="0px 8px">
						<div className="search_input">
							<FiSearch size="16px" color="#9A9CB0" />
							<input
								type="text"
								placeholder="Search"
								className="filter_search_input"
								onChange={(e) => setSearchInput(e.target.value)}
							/>
						</div>
					</Box>
					<div className="filter_menu_options">
						{_.filter(props.dropdownList, (a) => a.toLowerCase().includes(searchInput.toLowerCase()))
							.length !== 0 ? (
							props.dropdownList
								.filter((a) => a.toLowerCase().includes(searchInput.toLowerCase()))
								.map((item, index) => {
									return (
										<span
											className="filter_menu_option"
											key={index}
											onClick={() => {
												if (props.state.includes(item)) {
													props.setState(
														_.filter(props.state, (a) => {
															return a !== item
														})
													)
												} else {
													props.setState([...props.state, item])
												}
											}}
										>
											<Checkbox value={item} checked={props.state.includes(item)} />
											{item}
										</span>
									)
								})
						) : (
							<Typography
								textAlign="center"
								fontWeight="500"
								fontSize="16px"
								lineheight="24px"
								color="#b1b3c4"
							>
								No options available.
							</Typography>
						)}
					</div>
				</div>
			)}
		</SContainer>
	)
}

const SContainer = styled.div`
	display: flex;
	position: relative;

	.back_purple {
		color: #6728cc !important;
		background: #f2edfc !important;

		border: 1px solid #814cd6 !important;
	}

	.filter_option {
		display: flex;
		align-items: center;
		padding: 8px 20px;
		gap: 40px;
		white-space: nowrap;
		cursor: pointer;
		border: 1px solid #b1b3c4;
		border-radius: 40px;

		font-weight: 400;
		font-size: 14px;
		line-height: 20px;

		color: #9a9cb0;

		&:hover {
			color: #6728cc !important;
			background: #f2edfc !important;
			border: 1px solid #814cd6 !important;
		}
	}

	.filter_menu {
		z-index: 1;
		position: absolute;
		top: 46px;

		display: flex;
		flex-direction: column;
		padding: 8px 0px 12px;
		gap: 8px;

		min-width: 282px;
		max-height: 400px;

		background: #ffffff;

		border: 1px solid #eaebf2;
		box-shadow: 0px 19px 32px rgba(72, 58, 102, 0.08);
		border-radius: 12px;

		${(props) => props.openPosition}

		.search_input {
			display: flex;
			align-items: center;
			padding: 12px;
			gap: 8px;
			min-height: 44px;

			background: #f9f9fb;
			border-radius: 8px;

			.filter_search_input {
				border: none;
				outline: none;
				background: #f9f9fb;
				padding: 0px;

				font-weight: 400;
				font-size: 14px;
				line-height: 20px;

				&::placeholder {
					color: #9a9cb0;
				}

				&::-ms-input-placeholder {
					color: #9a9cb0;
				}
			}
		}

		.filter_menu_options {
			display: flex;
			flex-direction: column;
			padding: 0px 8px;
			overflow-y: auto;
			cursor: pointer;

			.filter_menu_option {
				display: flex;
				align-items: center;
				gap: 6px;
				padding: 8px;

				font-weight: 400;
				font-size: 14px;
				color: #1b1c20;

				&:hover {
					background: #f2edfc;
					border-radius: 8px;
				}
			}
		}
	}
`

export default FilterDropDown
