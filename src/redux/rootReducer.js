// ** Reducers Imports
import auth from './authentication'

// ** Root Reducer
import tasks from "@src/views/pages/tasks/store"

const rootReducer = {
  auth,
  tasks
}

export default rootReducer
