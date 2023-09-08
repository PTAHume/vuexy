import { Fragment, useState, forwardRef, useEffect } from 'react'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { getColumn, getData } from './data/FetchDealTableData'
import AddNewModal from './AddNewModal'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, Plus, Check } from 'react-feather'
import { useDispatch } from 'react-redux'
import PageSpinner from '@components/globalspinner/PageSpinner'
import sanctumService from '@sanctum/sanctumService.js'

import { useSubscribeToChannel } from '@core/auth/laravel-echo/useSubscribeToChannel'


import Avatar from '@components/avatar'

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
import { render } from '@fullcalendar/core/preact'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))


const Deals = () => {
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
  const sanctum = new sanctumService()
  const dispatch = useDispatch() // Get the dispatch method

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)

  const handleWebSocketError = (error) => {
    // Your error handling code here
    if (error.response && error.response.status === 401) {
      sanctum.refreshUserToken()
    }
  }
   

  const handleWebSocketSuccess = (status) => {
    // Your success handling code here
      console.log(status)
  }


  const onDataReceived = (data) => {
   
    setIsLoading(true)
    // Assuming data.deals contains the updated deal object
    const updatedDeal = data.deals
  
    setTableData((prevTableData) => {
      // console.log(prevTableData)
      // Find the index of the deal to update in the prevTableData array
      const dealIndex = prevTableData.findIndex((deal) => deal.id === updatedDeal.id)
      // console.log(dealIndex)
      // If the deal is found, update it in the prevTableData array
      if (dealIndex !== -1) {
        updatedDeal.status = updatedDeal.status === 'approved' ? 'approved' : 'pending'
        // Create a new array with the updated deal
        const updatedTableData = [
          ...prevTableData.slice(0, dealIndex),
          updatedDeal,
          ...prevTableData.slice(dealIndex + 1)
        ]
      
        // Return the updated table data
        return updatedTableData
      } else {
        // If the admin is not found, return the previous state
        return prevTableData
      }
    })
    setTimeout(() => {
      setIsLoading(false)
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Form Updated!</h6>
            <div></div>
            <span>List refreshed!</span>
          </div>
        </div>
      )
    }, 400)
  }
  
 useSubscribeToChannel('deals', handleWebSocketError, handleWebSocketSuccess, onDataReceived)

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
  
  const columns = getColumn(refreshData, dispatch)
  
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

  // ** Custom Pagination
  const CustomPagination = () => (
   render(<ReactPaginate
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
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
    />)
  )

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>Admins List</CardTitle>
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
      <AddNewModal open={modal} handleModal={handleModal} />
    </Fragment>
  )
}
export default Deals
