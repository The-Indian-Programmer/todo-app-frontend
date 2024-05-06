
// ** React Imports
import { useState, useEffect, Fragment } from 'react'


// ** Reactstrap Imports
import { Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'

// ** Custom Components
import { toast, Slide } from 'react-toastify'
import Toast from '@src/views/components/toast/Toast'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { TaskStatus, TaskPriority } from './common/TableComponent'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import moment from 'moment'


// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, getTasks } from './store'
import { ChevronDown, Crosshair, Edit, Edit2, MoreVertical, Trash } from 'react-feather'
import NoTableData from '../../components/table/NoTableData'
import LoadingComponent from '../../components/table/LoadingComponent'
import { isEmpty } from '../../../helper/function'
import ChangeStatusModal from './common/ChangeStatusModal'
import ConfirmationModal from './common/ConfirmationModal'

// ** Routes & Router
import { useHistory } from 'react-router-dom'


const TaskTable = () => {

  // ** Router Import
  const history = useHistory()

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.tasks.taskList)


  // ** State Vars
  const [currentPage, setCurrentPage] = useState(1)
  const [perPageItem, setPerPageItem] = useState(10)
  const [sort, setSort] = useState('id')
  const [sortOrder, setSortOrder] = useState('desc')
  const [isLoading, setIsLoading] = useState(false)
  const [changeStatusModalInfo, setChangeStatusModalInfo] = useState(null)
  const [deleteTaskModalInfo, setDeleteTaskModalInfo] = useState(null)


  // ** Function to get data
  const getAllTaskList = async () => {
    try {
      if (store.data?.length == 0) {
        setIsLoading(true)
      }
      await dispatch(getTasks({ page: currentPage, perPage: perPageItem, sort, sortOrder }))
      setIsLoading(false)
    } catch (error) {
      toast.error(<Toast status='error' message={error.message} />, { transition: Slide, hideProgressBar: true })
    }
  }




  // ** Function to get data
  useEffect(() => {
    getAllTaskList()
  }, [currentPage, perPageItem, sort, sortOrder])


  // ** Function to handle Sort
  const handleSort = (column) => {
    if (column.selector === sort) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSort(column.selector)
      setSortOrder('desc')
    }
  }


  // ** Priority modal toggle
  const toggleChangeStatusModal = (row) => setChangeStatusModalInfo(row)

  // ** Delete modal toggle
  const toggleDeleteTaskModal = (row) => setDeleteTaskModalInfo(row)

  // ** Function to handle status updated
  const handleStatusUpdated = () => {
    setChangeStatusModalInfo(null)
    getAllTaskList()
  }

  // ** Function to handle task delete
  const handleTaskDelete = async () => {
    try {
      const { taskId } = deleteTaskModalInfo

      const res = await dispatch(deleteTask({taskId}))
      if (!res.payload.status) return toast.error(<Toast status='error' message={res.payload.message} />, { transition: Slide, hideProgressBar: true })

      setDeleteTaskModalInfo(null)
      getAllTaskList()

      toast.success(<Toast status='success' message={res.payload.message} />, { transition: Slide, hideProgressBar: true })

    } catch (error) {
      toast.error(<Toast status='error' message={error.message} />, { transition: Slide, hideProgressBar: true })
    }
  }

  // ** Function to handle Edit
  
  const handleEdit = (e, row) => {
    e.preventDefault()
    history.push(`/task/edit/${row.taskId}`)
  }

  // ** Table Columns
  const columns = [

    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      minWidth: '250px',
      cell: row => <p className='text-bold-500 my-1'>{row.title}</p>
    },
    {
      name: 'Priority',
      selector: 'priority',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return <TaskPriority priority={row.priority} />
      }
    },
    {
      name: 'Status',
      selector: 'taskStatus',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return <TaskStatus status={row.taskStatus} />
      }
    },
    {
      name: 'Created Date',
      selector: 'createdAt',
      sortable: true,
      minWidth: '250px',
      cell: row => <p className='text-bold-500 my-1'>{moment(row.createdAt).format('MMM DD, YYYY hh:mm A')}</p>
    },
    {
      name: 'Actions',
      allowOverflow: true,
      sortable: false,
      minWidth: '100px',
      cell: row => {
        return (
          <UncontrolledDropdown>
            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem className='w-100' onClick={(e) => handleEdit(e, row)}>
                <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
              </DropdownItem>

              <DropdownItem className='w-100'  onClick={() => toggleChangeStatusModal(row)}>
                <Crosshair className='me-50' size={15} /> <span className='align-middle'>Change Status</span>
              </DropdownItem>


              <hr className='py-0 my-0' />
              <DropdownItem className='w-100' onClick={() => toggleDeleteTaskModal(row)}>
                <Trash className='me-50 text-danger' size={15} /> <span className='align-middle text-danger'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )
      }
    }
  ]

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }


  // ** Custom Pagination
  const CustomPagination = () => {
    const pageCount = Math.ceil(store.total / perPageItem)

    return <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage !== 0 ? currentPage - 1 : 0}
      onPageChange={page => handlePagination(page)}
      pageCount={pageCount}
      breakLabel='...'
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
  }



  return (
    <Fragment>
      <Card className='card-company-table'>
        <DataTable
          columns={columns}
          bordered
          className='react-dataTable'
          style={{ minHeight: '70vh' }}
          data={store?.data || []}
          persistTableHead={true}
          noHeader={true}
          responsive={true}
          keyField="courseID"
          sortIcon={<ChevronDown />}
          pagination={true}
          sortServer={true}
          paginationServer={true}
          paginationTotalRows={store?.total}
          onSort={handleSort}
          paginationComponent={CustomPagination}
          progressPending={isLoading}
          progressComponent={<LoadingComponent />}
          noDataComponent={<NoTableData message={'No tasks found'} />}
        />
      </Card>
      {!isEmpty(changeStatusModalInfo) && <ChangeStatusModal show={!isEmpty(changeStatusModalInfo)} onClose={() => setChangeStatusModalInfo(null)} data={changeStatusModalInfo} onSuccess={handleStatusUpdated}/>}
      {!isEmpty(deleteTaskModalInfo) && <ConfirmationModal show={!isEmpty(deleteTaskModalInfo)} handleClose={() => setDeleteTaskModalInfo(null)} handleSubmit={handleTaskDelete}/>}
    </Fragment>
  )
}

export default TaskTable
