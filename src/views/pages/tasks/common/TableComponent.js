import React from 'react';

import { Badge } from 'reactstrap';

const TaskStatus = ({ status }) => {
    const statusColor = {
        'in-progress': 'warning',
        'completed': 'success',
        'todo': 'info'
    }

    return <Badge className='text-capitalize' color={statusColor[status]} pill>{status}</Badge>
};

const TaskPriority = ({ priority }) => {
    const priorityColor = {
        'low': 'success',
        'medium': 'warning',
        'high': 'danger'
    }

    return <Badge className='text-capitalize' color={priorityColor[priority]} pill>{priority}</Badge>
};


export { TaskStatus, TaskPriority };