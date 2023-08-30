import { Fragment, useState, forwardRef, useEffect } from 'react'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { getColumns, getData } from './data/FetchDealTableData'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, Plus } from 'react-feather'
import { useDispatch } from 'react-redux'
import PageSpinner from '@components/globalspinner/PageSpinner'

import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))


const UserDeals = () => {
  // ** States
  const [selectedRows, setSelectedRows] = useState([])
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const [totalDeals, setTotalDeals] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
 // const sanctum = new sanctumService()
  const dispatch = useDispatch() // Get the dispatch method

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)


 const refreshData = async (page = currentPage) => {
  try {
    setIsLoading(true)
    const { deals, total, itemsPerPage } = await getData(page, perPage)
    setTableData(deals)
    setTotalDeals(total)
    setPerPage(itemsPerPage)
    setIsLoading(false)
  } catch (error) {
    console.log(error)
    setIsLoading(false)
  }
}
  
  const columns = getColumns(refreshData, dispatch)
  
  useEffect(() => {
    refreshData()
  }, [currentPage])
  

  // ** Function to handle filter
  const handleFilter = async (e) => {
    const value = e.target.value
    setSearchValue(value)
  
    if (value.length) {
      const { deals, total } = await getData(1, 10, value)
      setFilteredData(deals)
      setTotalDeals(total)
    } else {
      const { deals, total } = await getData(1, 10)
      setFilteredData([]) // Clear the filtered data
      setTableData(deals)
      setTotalDeals(total)
      }
  }
  

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  function setReactPaginate() {
    return <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={totalDeals > 0 ? Math.ceil(totalDeals / perPage) : 1}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1' />
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    setReactPaginate()
  )

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>My Deals List</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            <UncontrolledButtonDropdown>
              <DropdownToggle color='secondary' caret outline>
                <Share size={15} />
                <span className='align-middle ms-50'>Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className='w-100'>
                  <Printer size={15} />
                  <span className='align-middle ms-50'>Print</span>
                </DropdownItem>
                
                
              </DropdownMenu>
            </UncontrolledButtonDropdown>
            <Button className='ms-2' color='primary' onClick={handleModal}>
              <Plus size={15} />
              <span className='align-middle ms-50'>Add Record</span>
            </Button>
          </div>
        </CardHeader>
        <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='me-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <div className='react-dataTable react-dataTable-selectable-rows'>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <PageSpinner color="primary" />
          </div>
        ) : (
          <DataTable
          noHeader
          pagination
          onPageChange={(page) => refreshData(page + 1)} // The `page` value here is zero-based, so we add 1.
          selectableRows
          columns={columns}
          paginationPerPage={10}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          paginationDefaultPage={currentPage + 1}
          selectableRowsComponent={BootstrapCheckbox}
          data={searchValue.length ? filteredData : tableData}
          onSelectedRowsChange={(state) => setSelectedRows(state.selectedRows)}
         
        />
        )}
        </div>
      </Card>
    </Fragment>
  )
}
export default UserDeals
