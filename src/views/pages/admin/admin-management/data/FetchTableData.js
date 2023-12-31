import Avatar from '@components/avatar'
import React, { useState, useRef } from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import { updateAdminStatus } from '../store/updateAdminStatus'
import { Link } from 'react-router-dom'
import sanctumService from '@sanctum/sanctumService'
import { toast } from 'react-toastify'

// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const sanctum = new sanctumService()

// ** Table Zero Config Column
const getColumn = (refreshData, dispatch) => {
  return [
    {
      name: 'ID',
      sortable: true,
      maxWidth: '100px',
      selector: row => row.id
    },
    {
      name: 'Name',
      sortable: true,
      minWidth: '225px',
      selector: row => row.name,
      cell: row => (
        <div className='d-flex align-items-center'>
          {row.image === '' ? (
            <Avatar color={`light-${states[row.status]}`} content={row.name} initials />
          ) : (
            <Avatar img={`${sanctum.baseurl()}${row.image}`} />
          )}
          <div className='user-info text-truncate ms-1'>
            <span className='d-block fw-bold text-truncate'>
              <Link to={`${row.id}/edit`} state={{ adminDatas: row }}>
                {row.name}
              </Link></span>

          </div>
        </div>
      )
    },
    {
      name: 'Email',
      sortable: true,
      minWidth: '310px',
      selector: row => row.email
    },
    {
      name: 'Mobile',
      sortable: true,
      minWidth: '250px',
      selector: row => row.mobile
    },
    {
      name: 'Type',
      sortable: true,
      minWidth: '100px',
      selector: row => row.type
    },
    {
      name: 'Status',
      sortable: true,
      minWidth: '175px',
      selector: row => row.status,
      cell: row => {
        const [checked, setChecked] = useState(parseInt(row.status, 10) === 1)
        const handleStatusChange = async () => {
          try {
            const newStatus = checked ? 0 : 1
            // Dispatch the Redux action
            const prom = dispatch(updateAdminStatus({ adminId: row.id, status: newStatus }))
             toast.promise(prom, {
              pending: "Updating the Status...",
              success: () => {
                setChecked(!checked)
                toast.dismiss()
                return "Saved successfully!"
              },
              error: (error) => {
                console.log(error)
                return "Error updating!"
              }
            })
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
            await sanctum.deleteAdmin(row.id)
            // Show a success message or update the UI to remove the deleted item
            console.log("Admin deleted successfully")
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
                  handleDelete()
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
}

const getData = async () => {

  try {
    const response = await sanctum.getAdminData()
    const adminData = response.data
    // console.log(response)
    return adminData
  } catch (error) {
    console.log(error)
  }
}

export {
  getData,
  getColumn
}
