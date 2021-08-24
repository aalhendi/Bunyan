import React from "react";
import { useParams } from "react-router";
import taskStore from "../../stores/taskStore";

const TaskDetail = () => {
    const { taskId } = useParams();
    /* fetch the selected task */
    const task = taskStore.tasks.find((task) => task.id === +taskId);
    console.log(task)
    return (
        <div>
            <div className="text-center d-flex align-items-center justify-content-around">
                <h2 className="display-3">{task.name}</h2>
                <span className="badge badge-info">In Progress</span>
            </div>

            <div className="d-md-flex h-md-100 align-items-center text-center">
                {/* Image uploaded by worker */}
                <div className="col-md-6 h-md-100">
                    <img src={task.image} class="rounded mx-auto d-block w-50" alt="..." />
                </div>
                {/* Task Description */}
                <div className="col-md-6 p-0 bg-white h-md-100 loginarea">
                    <div className="align-items-center h-md-100 p-5 justify-content-center">
                        {task.description}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default TaskDetail;