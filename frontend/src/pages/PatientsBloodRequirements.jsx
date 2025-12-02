import ChoosePatient from "../components/ChoosePatient"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import TableRow from "../components/TableRow"

function PatientsBloodRequirements({ backendURL }) {
    const [chosenPatient, setChosenPatient] = useState('')
    const [requirements, setRequirements] = useState([])

    useEffect(() => {
        async function loadRequirements() {
            if (!chosenPatient) return

            try {
                const response = await fetch(`${backendURL}/requirements/${chosenPatient}`)
                const data = await response.json()
                setRequirements(data)
            } catch (err) {
                console.error("Error loading requirements:", err)
            }
        }

        loadRequirements()
    }, [chosenPatient, backendURL])

    async function handleDelete(requirementID) {
        try {
            await fetch(`${backendURL}/requirements/${chosenPatient}/${requirementID}`, {
                method: "DELETE",
            })

            setRequirements(requirements.filter(r => r.requirementID !== requirementID))
        } catch (err) {
            console.error("Error deleting requirement:", err)
        }
    }

    return (
        <>
            <h1>Patients Blood Requirements</h1>

            {!chosenPatient && (
                <ChoosePatient backendURL={backendURL} onSelect={setChosenPatient} />
            )}

            {chosenPatient && requirements.length > 0 && (
                <>
                <div className="table-container">
                    <Link to={`/requirements/new/${chosenPatient}`} className="bb-btn">
                        New Requirement
                    </Link>
                    <h2 className="table-title">
                        {requirements[0].firstName} {requirements[0].lastName}
                    </h2>
                    <div className="table-wrapper">
                        
                    <table>
                        <thead>
                            <tr>
                                <th>Requirement ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {requirements.map(req => (
                                <tr key={req.requirementID}>
                                <td>{req.requirementID}</td>
                                <td>{req.requirementName}</td>
                                <td>{req.requirementDescription}</td>
                                <td>
                            <button onClick={() => handleDelete(req.requirementID)}>
                                Delete
                            </button>
                                 </td>
                            </tr>
                        ))}
                        </tbody>

                    </table>
                    </div>
                    </div>
                </>
            )}
        </>
    )
}

export default PatientsBloodRequirements

