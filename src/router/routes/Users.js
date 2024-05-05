import { lazy } from 'react'

const UserRoutes = [
  {
    path: '/task/create',
    component: lazy(() => import('../../views/pages/tasks/create')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'ACL'
    }
   
  },
  {
    path: '/task/edit/:id',
    component: lazy(() => import('../../views/pages/tasks/create')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'ACL'
    }
   
  }
]

export default UserRoutes
