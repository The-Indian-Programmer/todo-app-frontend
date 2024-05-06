const URLCONFIG = {
    baseUrl: process.env.REACT_APP_BASE_URL || 'http://localhost:3000',
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3500'
}


const dashboard = {
    getAllTasks: `/task/list`,
    getTaskStats: `/task/stats`,
    getTask: `/task/get`,
    createTask: `/task/create`,
    updateTask: `/task/update`,
    deleteTask: `/task/delete`,
    changePriority: `/task/update-priority`
}


export default URLCONFIG
export { dashboard }