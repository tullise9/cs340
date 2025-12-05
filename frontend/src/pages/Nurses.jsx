// Citation for the following function:
// Date: 11/05/2025
// Copied from /OR/ Adapted from /OR/ Based on:
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
import { useState, useEffect } from "react"
import TableRow from "../components/TableRow"

function Nurses({ backendURL }) {

    //sate variable and function for loading nurses table
    const [nurses, setNurses] = useState([])

    //loads nurse table data after component mounts
    useEffect(() => {
        async function loadNurses() {
            try {
                const response = await fetch(`${backendURL}/nurses`)
                const data = await response.json()
                setNurses(data)
            } catch (err) {
                console.error("Error loading nurses:", err)
            }
        }

        loadNurses()
    }, [backendURL])

    return (
        <>
            <div className="table-container">

                <h1>Nurses</h1>
                <div className="homepageDescription">
                </div>

                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Nurse ID</th>
                                <th>Name</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>

                        <tbody>
                            {nurses.map(n => (
                                <TableRow
                                    key={n.nurseID}
                                    columns={[
                                        n.nurseID,
                                        n.nurseName,
                                        n.phoneNumber
                                    ]}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Nurses
