import React from 'react';
import { DeleteBtn, UpdateBtn } from './styles';
/* State and Store */
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';
import taskStore from '../../stores/taskStore';

function TaskItem({ task, openTask, updateTask }) {
    var taskBorder
    if (task.status === 0) {
        /* In progress */
        taskBorder = 'border-info'
    } else if (task.status === 1) {
        /* Waiting Approval from Company */
        taskBorder = 'border-warning'
    } else if (task.status === 2) {
        taskBorder = 'border-danger'
    } else {
        taskBorder = 'border-success'
    }
    const check = () => {
        updateTask(task)
        openTask(true);
    }
    return (
        <div>
            <div className={`col-9 card mx-auto mb-3 ${taskBorder} text-decoration-none text-dark`}>
                <div className="card-body d-flex align-items-center justify-content-between" >
                    <Link to={`/task/${task.id}/taskDetail`} className="text-decoration-none text-black w-75">
                        <h3 key={task.id}>{task.name}</h3>
                    </Link>

                    <div className="">
                        <UpdateBtn onClick={check} />
                        <DeleteBtn onClick={() => taskStore.deleteTask(task.id)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default observer(TaskItem);