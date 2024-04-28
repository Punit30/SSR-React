import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import styled, { css } from "styled-components";
import Pagination from "./Pagination";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";

function DataTable(props) {

	const theme = useTheme()
	const isMD = useMediaQuery(theme.breakpoints.up("md"))

	const [paginationData, setPaginationData] = useState({
		pageSize: 0,
		currentPage: 0,
		totalData: 0,
	});

	const defaultColDef = {
		sortable: true,
		filter: true,
		lockPosition: "left",
		cellClass: "locked-col",
	};

	const [gridApi, setGridApi] = useState();

	const onGridReady = (params) => {
		setGridApi(params.api);
		if (props.onGridReady) {
			props.onGridReady(params);
		}
	};

	const handlePageChange = (page) => {
		gridApi.paginationGoToPage(page - 1);
	};

	const onPaginationChanged = () => {
		if (gridApi) {
			const pageSize = gridApi.paginationGetPageSize();
			const totalData = gridApi.paginationGetRowCount();
			const currentPage = gridApi.paginationGetCurrentPage() + 1;

			if (
				pageSize !== paginationData["pageSize"] ||
				totalData !== paginationData["totalData"] ||
				currentPage !== paginationData["currentPage"]
			) {
				setPaginationData({
					pageSize: pageSize,
					totalData: totalData,
					currentPage: currentPage,
				});
			}
		}
	};

	return (
		<SDataTableContainer
			containerHeight={
				props.pagination && paginationData["totalData"] > props.pageSize
					? props.containerHeight
					: `calc(${props.containerHeight} + ${isMD ? "72px" :"98px"})`
			}
			pagination={props.pagination}
			totalData={paginationData["totalData"]}
			pageSize={props.pageSize}
		>
			<div className="ag-theme-alpine">
				<AgGridReact
					rowData={props.rowData}
					columnDefs={props.columnDefs}
					defaultColDef={props.defaultColDef || defaultColDef}
					onGridReady={onGridReady}
					rowHeight={props.rowHeight}
					pagination={props.pagination}
					suppressPaginationPanel={true}
					onPaginationChanged={onPaginationChanged}
					paginationPageSize={props.pageSize}
					defaultCsvExportParams={{ allColumns: true }}
					onFilterChanged={props.onFilterChange}
					onFilterModified={props.onFilterModified}
					onFilterOpened={props.onFilterOpened}
					overlayLoadingTemplate={
						'<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
					}
				/>
			</div>
			{props.pagination && paginationData["totalData"] > props.pageSize ? (
				<div className="pagination_detail">
					<div className="pagination_detail_section">
						<span className="bold_text">
							{paginationData["pageSize"] *
								(paginationData["currentPage"] - 1) +
								1}
						</span>
						to
						<span className="bold_text">
							{paginationData["pageSize"] *
								(paginationData["currentPage"] - 1) +
								props.pageSize >
							paginationData["totalData"]
								? paginationData["totalData"]
								: paginationData["pageSize"] *
										(paginationData["currentPage"] - 1) +
								  props.pageSize}
						</span>
						of <span className="bold_text">{paginationData["totalData"]}</span>
					</div>
					<div className="pagination_action_panel">
						<Pagination
							className="pagination_bar"
							currentPage={paginationData["currentPage"]}
							totalCount={paginationData["totalData"]}
							pageSize={paginationData["pageSize"]}
							onPageChange={(page) => handlePageChange(page)}
						/>
					</div>
				</div>
			) : null}
		</SDataTableContainer>
	);
}

const PaginationCss = css`
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	border-bottom-left-radius: 0px;
	border-bottom-right-radius: 0px;
`;
const NormalCss = css`
	border-radius: 8px;
`;

const SDataTableContainer = styled.div`
	width: 100%;
	height: 100%;

	.pagination_detail {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 16px 16px 24px 16px;
		gap: 8px;
		width: 100%;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
		border: solid #eaebf2;
		border-width: 0px 1px 1px 1px;

		@media only screen and (max-width: 560px) {
			flex-direction: column;
			align-items: center;
		}

		@media only screen and (min-width: 560px) and (max-width: 790px) {
			flex-direction: column;
			align-items: flex-end;
		}

		.pagination_detail_section {
			display: flex;
			align-items: center;
			gap: 4px;
			font-family: "Inter";
			font-weight: 400;
			font-size: 16px;
			line-height: 16px;
			color: #9a9cb0;

			@media only screen and (max-width: 790px) {
				padding: 0px 18px;
			}

			.bold_text {
				font-weight: 600;
			}
		}

		.pagination_action_panel {
			display: flex;
			align-items: center;

			.pagination_bar {
				display: flex;
				align-items: center;
				padding-left: 0px;
			}
		}
	}

	.ag-theme-alpine {
		width: 100%;
		height: ${(props) => props.containerHeight};

		--ag-alpine-active-color: #814cd6;
		--ag-row-hover-color: #F9F9FB;
		--ag-foreground-color: #717385;
		--ag-background-color: #fff;
		--ag-header-foreground-color: #717385;
		--ag-header-background-color: #f9f9fb;
		--ag-odd-row-background-color: #fff;
		--ag-border-color: #eaebf2;

		.ag-root-wrapper {
			border: 1px solid #eaebf2;

			${(props) =>
				props.pagination && props.totalData >= props.pageSize
					? PaginationCss
					: NormalCss}
		}

		.ag-row .ag-cell {
			display: flex;
			align-items: center;
			padding: 24px 26px;
			font-family: "Inter";
			font-weight: 400;
			font-size: 14px;
			line-height: 20px;

			color: #717385;
		}

		.ag-header-cell {
			padding: 14px 26px;
		}
		.ag-header-cell-text {
			font-family: "Inter";
			font-weight: 500;
			font-size: 14px;
			line-height: 20px;

			color: #717385;
		}
		.ag-cell-label-container {
			padding: 0px;
		}

		.ag-popup {
			height: 0 !important;
			min-height: 0 !important;
		}
	}
`;

DataTable.defaultProps = {
	rowHeight: 46,
	containerHeight: "400px",
	pageSize: 50,
	pagination: false,
	onFilterChange: () => {},
	onFilterOpened: () => {},
	onFilterModified: () => {},
};

export default DataTable;
