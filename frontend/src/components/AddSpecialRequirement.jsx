import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

function AddSpecialRequirement({ backendURL }) {
    const { patientId } = useParams()
    const navigate = useNavigate()

    const [requirementId, setRequirementId] = useState("")
    const [requirements, setRequirements] = useState([])

    useEffect(() => {
        async function loadRequirements() {
            try {
                const response = await fetch(`${backendURL}/requirements`)
                const data = await response.json()
                setRequirements(data)
            } catch (err) {
                console.log("Error loading requirements list:", err)
            }
        }

        loadRequirements()
    }, [backendURL])

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await fetch(`${backendURL}/patientRequirements`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    patientId: Number(patientId),
                    requirementId: Number(requirementId)
                })
            })

            console.log("Requirement added.")
            navigate("/PatientsBloodRequirements")
        } catch (err) {
            console.log("Backend offline — UI still works.", err)
        }
    }

    function handleCancel() {
        navigate("/PatientsBloodRequirements")
    }

    return (
        <>
            <h1>Add Special Requirement Form</h1>
            <form onSubmit={handleSubmit}>
                <label>Select Requirement:</label>
                <select
                    value={requirementId}
                    onChange={(e) => setRequirementId(e.target.value)}
                >
                    <option value="">Choose requirement</option>
                    {requirements.map((r) => (
                        <option key={r.requirementID} value={r.requirementID}>
                            {r.requirementName} — {r.requirementDescription}
                        </option>
                    ))}
                </select>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </>
    );
}

export default AddSpecialRequirement;
