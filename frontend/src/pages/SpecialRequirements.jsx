import { useState, useEffect } from "react"
import TableRow from "../components/TableRow"
import { Link } from "react-router-dom"

function SpecialRequirements({ backendURL }) {
    const [requirements, setRequirements] = useState([])

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
        <div class="table-container">
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
