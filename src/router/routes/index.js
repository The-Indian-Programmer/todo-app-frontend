// ** Routes Imports
import PagesRoutes from './Pages'
import DashboardRoutes from './Dashboards'
import UserRoutes from './Users'

// ** Document title
const TemplateTitle = 'Task Manager'

// ** Default Route
const DefaultRoute = '/dashboard'


// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  ...PagesRoutes,
  ...UserRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
