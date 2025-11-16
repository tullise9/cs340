import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function AddSpecialRequirement() {
    //will add the special requirement to the intersection table for the selected patient
    const { patientId } = useParams()
    const navigate = useNavigate()

    const [requirementId, setRequirementId] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await fetch("/patientRequirements", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    patientId: Number(patientId),
                    requirementId
                })
            })
        } catch (err) {
            console.log("Backend offline — UI still works.")
        }
    }

    async function handleCancel() {
        navigate("/PatientsBloodRequirements")

    }

    return (
        <>
            <h1>Add Special Requirement Form</h1>
            <form onSubmit={handleSubmit}>
                <select value={requirementId} onChange={(e) => setRequirementId(Number(e.target.value))}>
                    <option value="">Select requirement</option>
                </select>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </>
    )
}


export default AddSpecialRequirement