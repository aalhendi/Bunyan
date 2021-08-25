import React from "react";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import taskStore from "../../stores/taskStore";

/* State and Store */
import { observer } from "mobx-react";

function ClientItem({ client }) {
  const taskItem = taskStore.tasks
    .filter((task) => task.contract?.clientId === client.id)
    .map(task => task.status)
  /* Calculation the Done and divide by total of tasks */
  const count = taskItem.reduce((a, b) => {
    return a + (b === 3)
  }, 0)
  const totalResult = Math.floor((count / taskItem.length) * 100)

  return (
    <tr>
      {/* Client Name */}
      <td className="p-5">
        <Link to={`/task/${client.id}`} >{`${client.firstName} ${client.lastName}`}</Link>
      </td>
      {/* Client Task Progress */}
      <td style={{ width: 100 }}>
        <CircularProgressbar value={totalResult} text={`${totalResult}%`} />
      </td>
    </tr>
  );
}

export default observer(ClientItem);
