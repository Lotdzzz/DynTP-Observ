// Props for the CRUDFrame component
export interface CRUDFrameProps {
  // The title of the CRUD frame
  title: string;
  // the tag of the CRUD frame
  tag: string
  // Total number of records.
  dataLength: number
  // Current page and page size for the list.
  pageNum: number
  pageSize: number
  // Whether the data table uses pagination.
  showPagination?: boolean
}
