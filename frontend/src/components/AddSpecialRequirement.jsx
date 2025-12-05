// Citation for the following function:
// Date: 11/05/2025
// Copied from /OR/ Adapted from /OR/ Based on:
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

function AddSpecialRequirement({ backendURL }) {

    // get patientId from URL
    const { patientId } = useParams()

    const navigate = useNavigate()

    //state varuables and functions for loading and setting data
    const [patient, setPatient] = useState({})
    const [requirementId, setRequirementId] = useState("")
    const [requirements, setRequirements] = useState([])

    //used to load patient name and blood requirements after component mounts
    useEffect(() => {
        async function loadPatient() {
            try {
                const response = await fetch(`${backendURL}/patients/${patientId}`)
                const data = await response.json()
                setPatient(data)
            } catch (err) {
                console.log("Error loading patient data:", err)
            }
        }

        async function loadRequirements() {
            try {
                const response = await fetch(`${backendURL}/requirements`)
                const data = await response.json()
                setRequirements(data)
            } catch (err) {
                console.log("Error loading requirements list:", err)
            }
        }

        loadPatient()
        loadRequirements()
    }, [patientId, backendURL])

    //sends data to backend for storage
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await fetch(`${backendURL}/requirements/${patientId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    requirementID: Number(requirementId)
                })
            })


            navigate(`/PatientsBloodRequirements/${patientId}`)

        } catch (err) {
            console.log("Backend offline — UI still works.", err)
        }
    }

    // naviagtes to current patient blood requriements upon canceling action
    function handleCancel() {
        navigate("/PatientsBloodRequirements")
    }

    return (
        <>
            <div className="form-container">
                <h2>Add Special Requirement </h2>

                <form onSubmit={handleSubmit}>
                    <label>Patient: {patient.firstName} {patient.lastName}</label>
                    <select
                        value={requirementId}
                        onChange={(e) => setRequirementId(e.target.value)}
                    >
                        <option value="">--Select--</option>
                        {requirements.map((r) => (
                            <option key={r.requirementID} value={r.requirementID}>
                                {r.requirementName} — {r.requirementDescription}
                            </option>
                        ))}
                    </select>

                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </>
    )
}

export default AddSpecialRequirement

