// Citation for the following function:
// Date: 11/05/2025
// Copied from /OR/ Adapted from /OR/ Based on:
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
import { useState, useEffect } from "react"
import TableRow from "../components/TableRow"
import { Link } from "react-router-dom"

function SpecialRequirements({ backendURL }) {

    //state variable and function for loading special requirements page
    const [requirements, setRequirements] = useState([])

    //loads special requirments table after component mounts
    useEffect(() => {
        async function loadRequirements() {
            try {
                const response = await fetch(`${backendURL}/requirements`)
                const data = await response.json()
                setRequirements(data)
            } catch (err) {
                console.error("Error loading requirements:", err)
            }
        }

        loadRequirements()
    }, [backendURL])

    return (
        <>
            <div className="table-container">
                <h1>Special Requirements</h1>
                <div className="homepageDescription">
                </div>

                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Requirement ID</th>
                                <th>Name</th>
                                <th>Details</th>
                            </tr>
                        </thead>

                        <tbody>
                            {requirements.map(r => (
                                <TableRow
                                    key={r.requirementID}
                                    columns={[
                                        r.requirementID,
                                        r.requirementName,
                                        r.requirementDescription
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

export default SpecialRequirements
