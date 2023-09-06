import React, { useState } from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import { updateDealStatus } from '../store/updateDealStatus'
import { Link } from 'react-router-dom'
import sanctumService from '../../../../../@core/auth/sanctum/sanctumService'
import { toast } from 'react-toastify'
// ** Vars
//const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']
const sanctum = new sanctumService()

// ** Table Zero Config Column
const getColumns = (refreshData, dispatch) => [
  {
    name: 'ID',
    sortable: true,
    maxWidth: '100px',
    selector: row => row.id
  },
  {
    name: 'User',
    sortable: true,
    minWidth: '180px',
    cell: row => (
      <div>
        <div style={{ marginTop: '30px' }}>
          {row.user_name}
        </div>
      </div>
    )
  },

  {
    name: 'Departure',
    sortable: true,
    minWidth: '200px',
    cell: row => (
      <div>
        <div style={{ marginTop: '5px' }}>
          {row.departure_country}
        </div>
        <div style={{ marginTop: '5px' }}>
          {row.departure_city}
        </div>
        <div style={{ marginTop: '5px' }}>
          {row.departure_airport}
        </div>
        <div style={{ marginTop: '5px' }}>
          {row.departure_date}
        </div>
      </div>
    )
  },
  {
    name: 'Arrival',
    sortable: true,
    minWidth: '200px',
    cell: row => (
      <div>
        <div style={{ marginTop: '5px' }}>
          {row.arrival_country}
        </div>
        <div style={{ marginTop: '5px' }}>
          {row.arrival_city}
        </div>
        <div style={{ marginTop: '5px' }}>
          {row.arrival_airport}
        </div>
        <div style={{ marginTop: '5px' }}>
          {row.arrival_date}
        </div>
      </div>
    )
  },

  {
    name: 'Type',
    sortable: true,
    minWidth: '80px',
    cell: row => {
      switch (row.delivery_type) {
        case "hand_luggage":
          return "Hand Luggage"

        case "baggage":
          return "Baggage"

        case "document":
          return "Document"
        default:
          return ""
      }
    }
  },

  {
    name: 'Weight (Kg)',
    sortable: true,
    minWidth: '140px',
    // selector: row => row.weight,
    cell: row => (
      <div>
        <div style={{ marginTop: '15px' }}>
          {row.weight}
        </div>

      </div>
    )
  },

  {
    name: 'Flight',
    sortable: true,
    minWidth: '100x',
    // selector: row => row.weight,
    cell: row => (
      <div>
        <div>
          Flight : {row.flight_number}
        </div>
      </div>
    )
  },

  {
    name: 'Price',
    sortable: true,
    minWidth: '70px',
    selector: row => row.price
  },

  {
    name: 'Status',
    sortable: true,
    minWidth: '153px',
    selector: row => row.status,
    cell: row => {
      const [status, setStatus] = useState(row.status)
      const [checked, setChecked] = useState(status === "approved")

      const handleStatusChange = async () => {
        try {
          const newStatus = checked ? "pending" : "approved"

          // Dispatch the Redux action
          toast.promise(
            dispatch(updateDealStatus({ dealId: row.id, status: newStatus })),
            {
              position: "bottom-left",
              loading: "Updating the Status...",
              success: () => {
                setChecked(!checked)
                setStatus(newStatus) // Update the status state variable
                return "Saved successfully!"
              },
              error: (error) => {
                console.log(error)
                return "Error updating!"
              }
            }
          )
        } catch (error) {
          console.log(error)
          return "Invalid Data!"
        }
      }

      return (
        <div className='form-switch form-check-primary'>

          <Input
            type='switch'
            name='icon-primary'
            id='icon-primary'
            checked={checked}
            onChange={() => setChecked(!checked)}
            onClick={handleStatusChange}
          />
          <div style={{ marginTop: '-1.4rem' }}>{checked ? "Active" : "InActive"}</div>
        </div>
      )
    }
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: (row) => {
      const handleDelete = async () => {
        try {
          await sanctum.deleteUserDeal(row.id)
          // Show a success message or update the UI to remove the deleted item
          console.log("Deal deleted successfully")
          // Refresh the data
          refreshData()
        } catch (error) {
          console.log(error)
          // Show an error message or handle the error as needed
        }
      }
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pe-1' tag='span' style={{ cursor: 'pointer' }}>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag={Link} to={`${row.id}/edit`} className='w-100'>
                <FileText size={15} />
                <span className='align-middle ms-50'>Details</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Archive size={15} />
                <span className='align-middle ms-50'>Archive</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => {
                e.preventDefault()
                handleDelete(row.id)
              }}>
                <Trash size={15} />
                <span className='align-middle ms-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Link to={`${row.id}/edit`}>
            <Edit size={15} />
          </Link>
        </div>
      )
    }
  }

]

const getData = async (page = 1, perPage = 10, search = '') => {
  // Adjust the page number to start from 1
  const adjustedPage = page > 0 ? page : 0

  try {

    //const response = await sanctum.getDealsData(adjustedPage, perPage, search)
    const response = await sanctum.getUserListUserDeals(null, adjustedPage, perPage, search)
    const deals = response.data.slice(0, -1)
    const pagination = response.data[response.data.length - 1].pagination
    const total = pagination.total
    const itemsPerPage = pagination.perPage
    return { deals, total, itemsPerPage }
  } catch (error) {
    console.log(error)
  }
}

export {
  getColumns,
  getData
}
