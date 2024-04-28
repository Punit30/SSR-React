export const dataTableExport = (api) => {
    api.exportDataAsCsv()
}

export const dataTableSearch = (api, value) => {
    api.setGridOption("quickFilterText" ,value)
}

export const dataTableAllFilterClear = (api) => {
    api.setFilterModel(null)
}