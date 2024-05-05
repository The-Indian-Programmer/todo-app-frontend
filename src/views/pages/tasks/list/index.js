
// ** React Imports
import { useEffect } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'


// ** Demo Components
import CompanyTable from '../TaskTable'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import StatsCard from '../StatsCard'


const TaskDashboard = () => {


  return (
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
        <Col xl='12' md='12' xs='12'>
          <StatsCard cols={{ xl: '3', sm: '6' }} />
        </Col>
      </Row>
      
      <Row className='match-height'>
        <Col lg='12' xs='12'>
          <CompanyTable />
        </Col>
        
      </Row>
    </div>
  )
}

export default TaskDashboard
