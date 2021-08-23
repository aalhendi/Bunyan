import React, { useState } from "react";
import workerStore from "../../stores/workerStore";
import AssignWorker from "./AssignWorker/AssignWorker";
import { observer } from "mobx-react";
import authStore from "../../stores/authStore";
import AddTask from "./addTask/AddTask";
import TaskItem from "./TaskItem"
import taskStore from "../../stores/taskStore";
import { useParams } from "react-router";
import clientStore from "../../stores/clientStore";


function TaskList() {
    if (authStore.loading || taskStore.loading || clientStore.loading) { <h3>Loading</h3> }
    /* ToDo: Add Task to the client */
    const { clientId } = useParams()
    const client = clientStore.clients.find(client => client.id === +clientId)
    /* Worker Modal */
    const [workerOpen, setWorkerOpen] = useState(false)
    const openWorker = () => { setWorkerOpen(true) };
    const closeWorker = () => { setWorkerOpen(false) }

    /* Task Modal */
    const [taskOpen, setTaskOpen] = useState(false)
    const openTask = () => { setTaskOpen(true) };
    const closeTask = () => { setTaskOpen(false) }
    /* ToDo: map all task in the taskitem */

    /* pass worker object to the modal */
    const workerItem = workerStore.workers.map((worker) => (worker));
    const taskItem = taskStore.tasks.filter(task => task.contract.clientId === +clientId).map(task => <TaskItem task={task} key={task.id} />)
    console.log()
    return (
        <div>
            {/* Will show the client Name -> props from client item  */}
            <h1 className="text-center m-3">{`${client?.firstName} ${client?.lastName}`}</h1>

            {/* Task List */}
            <div className="row">
                {/* Show the add Task and assign worker */}
                <div className="m-3">
                    <button type="button" className="btn btn-outline-primary me-3" onClick={openTask}>Add Task</button>
                    <button type="button" className="btn btn-outline-danger" onClick={openWorker}>Assign Worker</button>
                    <AssignWorker isOpen={workerOpen} closeModal={closeWorker} worker={workerItem} />
                    <AddTask isOpen={taskOpen} closeModal={closeTask} worker={workerItem} />

                </div>
                <div className="container">
                    {taskItem}
                </div>
            </div>
        </div>
    );
}

export default observer(TaskList);