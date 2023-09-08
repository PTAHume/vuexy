import { Fragment, useState, forwardRef, useEffect } from 'react'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { getColumns, getData } from './data/FetchTableData'
import AddNewModal from './AddNewModal'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, Plus, Check } from 'react-feather'
import { useDispatch } from 'react-redux'
import PageSpinner from '@components/globalspinner/PageSpinner'
import sanctumService from '@sanctum/sanctumService.js'
import { useSubscribeToChannel } from '@core/auth/laravel-echo/useSubscribeToChannel'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'

// ** Reactstrap Imports
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

function CustomPagination(currentPage, handlePagination, searchValue, filteredData, tableData) {
  return (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? Math.ceil(filteredData.length / 7) : Math.ceil(tableData.length / 7) || 1}
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
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1' />)
}

const Users = () => {
  // ** States
  const [selectedRows, setSelectedRows] = useState([])
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const sanctum = new sanctumService()
  const dispatch = useDispatch() // Get the dispatch method

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)

  const handleWebSocketError = (error) => {
    // Your error handling code here
    if (error.response && error.response.status === 401) {
      sanctum.refreshToken()
    }
  }

  const handleWebSocketSuccess = (status) => {
    // Your success handling code here
    console.log(status)
  }


  const onDataReceived = (data) => {
    //  console.log(data)
    setIsLoading(true)
    // Assuming data.users contains the updated admin object
    const updatedUser = data.users

    setTableData((prevTableData) => {
      // Find the index of the admin to update in the prevTableData array
      const userIndex = prevTableData.findIndex((user) => user.id === updatedUser?.id)

      // If the admin is found, update it in the prevTableData array
      if (userIndex !== -1) {
        // Create a new array with the updated admin
        const updatedTableData = [
          ...prevTableData.slice(0, userIndex),
          updatedUser,
          ...prevTableData.slice(userIndex + 1)
        ]

        // Return the updated table data
        return updatedTableData
      } else {
        // If the user is not found, return the previous state
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
            <span>List Updated by Admin!</span>
          </div>
        </div>
      )
    }, 400)

  }

  const refreshData = async () => {
    try {
      setIsLoading(true)
      const data = await getData()
      setTableData(data)

      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const columns = getColumns(refreshData, dispatch)

  useEffect(() => {
    refreshData()
  }, [])


  //lets listen the channel if something changes we reflect this
  useSubscribeToChannel('users', handleWebSocketError, handleWebSocketSuccess, onDataReceived)

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)


    if (value.length) {
      updatedData = tableData.filter(item => {
        const startsWith =
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.mobile.toLowerCase().startsWith(value.toLowerCase()) ||
          item.image.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.mobile.toLowerCase().startsWith(value.toLowerCase()) ||
          item.image.toLowerCase().startsWith(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>Users List</CardTitle>
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
              selectableRows
              columns={columns}
              paginationPerPage={7}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              paginationComponent={() => CustomPagination(currentPage, handlePagination, searchValue, filteredData, tableData)
              }
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
export default Users
