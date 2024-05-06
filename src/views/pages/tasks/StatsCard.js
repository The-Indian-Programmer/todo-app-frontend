// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import { TrendingUp, Plus, CheckCircle, AlertCircle } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'
import { toast, Slide } from 'react-toastify'
import Toast from '@src/views/components/toast/Toast'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Button } from 'reactstrap'

// ** Routes & Link
import { useHistory } from 'react-router-dom'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getTaskStats } from './store'



const TaskStatsCard = ({ cols }) => {

  // ** Store Vars
  const dispatch = useDispatch()
  const taskStats = useSelector(state => state.tasks.taskStats)

  // ** Router Vars
  const history = useHistory()

  // ** Get Tasks Stats
  const getTaskStatsData = async () => {
    try {
      await dispatch(getTaskStats())
    } catch (error) {
      toast.error(<Toast status='error' message={error.message} />, { transition: Slide, hideProgressBar: true })
    }
  }


  useEffect(() => {
    getTaskStatsData()
  }, [])


  const data = [
    {
      title: taskStats?.total || 0,
      subtitle: 'Total',
      color: 'light-primary',
      icon: <Plus size={24} />
    },
    {
      title: taskStats?.todo || 0,
      subtitle: 'To do',
      color: 'light-info',
      icon: <AlertCircle size={24} />
    },
     
    {
      title: taskStats?.inProgress || 0,
      subtitle: 'InProgress',
      color: 'light-danger',
      icon: <TrendingUp size={24} />
    },
    {
      title: taskStats?.completed || 0,
      subtitle: 'Completed',
      color: 'light-success',
      icon: <CheckCircle size={24} />
    },
    
   
   
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
          })}
        >
          <div className='d-flex align-items-center'>
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <h4 className='fw-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  const handleAddNew = () => {
    history.push('/task/create')
  }


  return (
    <Fragment>
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Statistics</CardTitle>
        <Button color='primary' onClick={handleAddNew} ><Plus size={15}/> Add New</Button>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
    </Fragment>
  )
}

export default TaskStatsCard
