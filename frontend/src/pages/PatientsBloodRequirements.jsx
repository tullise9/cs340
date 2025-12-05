// Citation for the following function:
// Date: 11/05/2025
// Copied from /OR/ Adapted from /OR/ Based on:
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
import ChoosePatient from "../components/ChoosePatient"
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

function PatientsBloodRequirements({ backendURL }) {
    const { patientId } = useParams()  

    const [chosenPatient, setChosenPatient] = useState(patientId || "")
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

    useEffect(() => {

        if (patientId) {
            setChosenPatient(patientId)
        }
    }, [patientId])

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

            {chosenPatient && requirements.length === 0 && (
                <div className="table-container">
                    <Link to={`/requirements/new/${chosenPatient}`} className="bb-btn">
                        New Requirement
                    </Link>
                    <h2>No special requirements found for this patient.</h2>
                </div>
            )}
        </>
    )
}

export default PatientsBloodRequirements


