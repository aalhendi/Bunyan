import React from "react";
import { useParams } from "react-router";
import taskStore from "../../stores/taskStore";

import { observer } from "mobx-react";
import { UpdateBtn } from "./styles";

import waitImage from "../../media/waitImage.svg";

const TaskDetail = () => {
  const { taskId } = useParams();
  /* fetch the selected task */
  const task = taskStore.tasks.find((task) => task.id === +taskId);
  var taskBorder, status;
  if (task?.status === 0) {
    /* In progress */
    taskBorder = 'badge bg-info text-dark col-3'
    status = "In Progress"
  } else if (task?.status === 1) {
    /* Waiting Approval from Company */
    taskBorder = 'badge bg-warning text-dark col-3'
    status = "Waiting Approval"
  } else if (task?.status === 2) {
    taskBorder = 'badge bg-danger col-3'
    status = "Waiting Client Approval"
  } else {
    taskBorder = 'badge bg-success col-3'
    status = "Done"
  }
  /* Approval from Company  */
  const handleClick = () => {
    taskStore.changeStatus(2, task?.id)
    window.location.reload();
  }
  return (
    <div>
      <div className="text-center d-flex align-items-center flex-column m-3">
        <h2 className="display-4">
          {task?.name} <UpdateBtn />
        </h2>
        <span class={taskBorder}>{status}</span>
      </div>

      <div className="d-md-flex h-md-100 align-items-center text-center">
        {/* Image uploaded by worker */}
        <div className="col-md-6 h-md-100">
          <img
            src={task?.image ? task.image : waitImage}
            class="rounded mx-auto d-block w-50"
            alt="..."
          />
        </div>
        {/* Task Description */}
        <div className="col-md-6 p-0 bg-white h-md-100 loginarea">
          <div className="align-items-center h-md-100 p-5 justify-content-center">
            <div className="border rounded p-3">
              <h2>Description</h2>
              {task?.description}
            </div>
            {/* ToDo: when the status comes for comapny will appear */}
            <div className="d-flex mt-3 justify-content-around col-4 mx-auto">
              {task?.status === 1 ? <button className="btn btn-danger" onClick={handleClick}>
                Give Worker Approve
              </button> : null}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(TaskDetail);
