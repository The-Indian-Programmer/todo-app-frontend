import React from 'react';

import { Badge } from 'reactstrap';

const TaskStatus = ({ status }) => {
    const statusColor = {
        'in-progress': 'warning',
        'completed': 'success',
        'todo': 'info'
    }

    return <Badge className='text-capitalize px-1' color={statusColor[status]} >{status}</Badge>
};

const TaskPriority = ({ priority }) => {
    const priorityColor = {
        'low': 'success',
        'medium': 'warning',
        'high': 'danger'
    }

    return <Badge className='text-capitalize px-1' color={priorityColor[priority]} >{priority}</Badge>
};


export { TaskStatus, TaskPriority };