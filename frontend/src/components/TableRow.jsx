// Citation for the following function:
// Date: 11/05/2025
// Copied from /OR/ Adapted from /OR/ Based on:
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
import React from "react";

function TableRow({ columns = [] }) {
    return (
        <tr>
            {columns.map((col, index) => (
                <td key={index}>{col}</td>
            ))}
        </tr>
    );
}

export default TableRow;
