import { Fragment, useState, forwardRef, useEffect } from 'react'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { getColumn, getData } from './data/FetchTableData'
import AddNewModal from './AddNewModal'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import { ChevronDown, Share, Printer, FileText, Plus, Check } from 'react-feather'
import { useDispatch } from 'react-redux'
import PageSpinner from '@components/globalspinner/PageSpinner'
import sanctumService from '../../../../@core/auth/sanctum/sanctumService.js'
import { useSubscribeToChannel } from '../../../../@core/auth/laravel-echo/useSubscribeToChannel'
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


const Admins = () => {
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
     console.log("for testing only", status)
  }


  const onDataReceived = (data) => {

    setIsLoading(true)
    // Assuming data.admins contains the updated admin object
    const updatedAdmin = data.admins
  
    setTableData((prevTableData) => {
      // Find the index of the admin to update in the prevTableData array
      const adminIndex = prevTableData.findIndex((admin) => admin.id === updatedAdmin.id)
  
      // If the admin is found, update it in the prevTableData array
      if (adminIndex !== -1) {
        // Create a new array with the updated admin
        const updatedTableData = [
          ...prevTableData.slice(0, adminIndex),
          updatedAdmin,
          ...prevTableData.slice(adminIndex + 1)
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
      toast.dismiss()
      toast(
        <StyleSheetManager shouldForwardProp={prop => isPropValid(prop)}>
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
        </StyleSheetManager>
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

  const columns = getColumn(refreshData, dispatch)
  
  useEffect(() => {
    refreshData()
  }, [])


  //lets listen the channel if something changes we reflect this
  //useSubscribeToAllAdminsList(handleWebSocketError, handleWebSocketSuccess, onDataReceived)
  useSubscribeToChannel('admins', handleWebSocketError, handleWebSocketSuccess, onDataReceived)


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
          item.type.toLowerCase().startsWith(value.toLowerCase()) ||
          item.image.toLowerCase().startsWith(value.toLowerCase()) 
          
        const includes =
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) || 
          item.mobile.toLowerCase().startsWith(value.toLowerCase()) ||
          item.type.toLowerCase().startsWith(value.toLowerCase())  || 
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
  const CustomPagination = () => (
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
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
    />
  )

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(tableData[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV() {
    const dataToExport = selectedRows.length > 0 ? selectedRows : tableData
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(dataToExport)
    if (csv === null) return
  
    const filename = 'export.csv'
  
    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }
  
    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

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
                <DropdownItem className='w-100' onClick={() => downloadCSV(tableData)}>
                  <FileText size={15} />
                  <span className='align-middle ms-50'>CSV</span>
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
          <div className="table-responsive">
          <DataTable
            noHeader
            pagination
            selectableRows
            columns={columns}
            paginationPerPage={7}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage + 1}
            selectableRowsComponent={BootstrapCheckbox}
            data={searchValue.length ? filteredData : tableData}
            onSelectedRowsChange={(state) => setSelectedRows(state.selectedRows)}
           
          />
           </div>
        )}
        </div>
      </Card>
      <AddNewModal open={modal} handleModal={handleModal} />
    </Fragment>
  )
}
export default Admins
