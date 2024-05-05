import { lazy } from 'react'

const DashboardRoutes = [
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/pages/tasks/list')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'ACL'
    }
   
  }
]

export default DashboardRoutes
