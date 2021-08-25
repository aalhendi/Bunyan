import React from "react";
import { useParams } from "react-router";
import taskStore from "../../stores/taskStore";

import { observer } from "mobx-react";
import { UpdateBtn } from "./styles";

const TaskDetail = () => {
  const { taskId } = useParams();
  /* fetch the selected task */
  const task = taskStore.tasks.find((task) => task.id === +taskId);
  return (
    <div>
      <div className="text-center d-flex align-items-center flex-column m-3">
        <h2 className="display-4">
          {task?.name} <UpdateBtn />
        </h2>
        <span class="badge bg-info text-dark col-3">In Progressa</span>
      </div>

      <div className="d-md-flex h-md-100 align-items-center text-center">
        {/* Image uploaded by worker */}
        <div className="col-md-6 h-md-100">
          <img
            src={task?.image}
            class="rounded mx-auto d-block w-50"
            alt="..."
          />
        </div>
        {/* Task Description */}
        <div className="col-md-6 p-0 bg-white h-md-100 loginarea">
          <div className="align-items-center h-md-100 p-5 justify-content-center">
            <div className="border rounded p-3">
              <h2>Task List:</h2>
              {task?.description}
            </div>
            {/* ToDo: when the status comes for comapny will appear */}
            <div className="d-flex mt-3 justify-content-around col-4 mx-auto">
              <button type="button" className="btn btn-danger">
                Give Worker Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(TaskDetail);
