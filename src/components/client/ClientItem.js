import React from 'react';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';

function ClientItem() {
    return (
        <tr>
            {/* Client Name */}
            <td className="p-5"><Link to="/task">Meshari Aldoukhi</Link></td>
            {/* Client Task Progress */}
            <td style={{ width: 100 }}><CircularProgressbar value={60} text={"60%"} /></td>
        </tr>
    );
}

export default ClientItem;