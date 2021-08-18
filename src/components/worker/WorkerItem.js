import React from "react";
import { observer } from "mobx-react";

function WorkerItem({ worker }) {
  return (
    <tr>
      {/* Client Name */}
      <td>{worker.name}</td>
    </tr>
  );
}

export default observer(WorkerItem);
