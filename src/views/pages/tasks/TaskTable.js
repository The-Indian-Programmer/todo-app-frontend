
// ** React Imports
import { useState, useEffect } from 'react'


// ** Reactstrap Imports
import {  Card } from 'reactstrap'

// ** Custom Components
import { toast, Slide } from 'react-toastify'
import Toast from '@src/views/components/toast/Toast'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {  TaskStatus, TaskPriority } from './common/TableComponent'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import moment from 'moment'


// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getTasks } from './store'
import { ChevronDown } from 'react-feather'
import NoTableData from '../../components/table/NoTableData'
import LoadingComponent from '../../components/table/LoadingComponent'


const TaskTable = () => {

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.tasks.taskList)


  // ** State Vars
  const [currentPage, setCurrentPage] = useState(1)
  const [perPageItem, setPerPageItem] = useState(10)
  const [sort, setSort] = useState('id')
  const [sortOrder, setSortOrder] = useState('desc')
  const [isLoading, setIsLoading] = useState(false)


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
        const priorityColor = {
          low: 'success',
          medium: 'warning',
          high: 'danger'
        }
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
    <Card className='card-company-table'>
      <DataTable
            columns={columns}
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
  )
}

export default TaskTable
