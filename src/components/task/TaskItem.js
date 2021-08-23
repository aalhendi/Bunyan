import React from 'react';

function TaskItem({ task }) {
    return (
        <div>
            <div className="col-9 card mx-auto mb-3 border-info">
                <div className="card-body d-flex align-items-center ">
                    <h3 key={task.id}>{task.name}</h3>
                </div>
            </div>
        </div>
    );
}

export default TaskItem;