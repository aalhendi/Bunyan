/* Imports */
import React from "react";

/* State and Store */
import { observer } from "mobx-react";

const WorkerItem = ({ worker }) => {
  return (
    <tr>
      {/* Client Name */}
      <td>{worker.name}</td>
    </tr>
  );
};

export default observer(WorkerItem);
