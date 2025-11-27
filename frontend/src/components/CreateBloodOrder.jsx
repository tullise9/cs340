import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function CreateBloodOrder({ backendURL }) {
    const navigate = useNavigate()

    const [patientId, setPatientId] = useState("")
    const [dateTime, setDateTime] = useState("")
    const [volume, setVolume] = useState("")
    const [patients, setPatients] = useState([])

    useEffect(() => {
        async function loadPatients() {
            try {
                const response = await fetch(`${backendURL}/patients`)
                const data = await response.json()
                setPatients(data)
            } catch (err) {
                console.log("Error loading patient list", err)
            }
        }

        loadPatients()
    }, [backendURL])

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await fetch(`${backendURL}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    patientId,
                    volume,
                    dateTime
                })
            })

            console.log("Blood order saved")
            navigate("/BloodOrders")
        } catch (err) {
            console.log("Backend offline — UI still works", err)
        }
    }

    function handleCancel() {
        navigate("/BloodOrders")
    }

    return (
        <>
        <div class="form-container">
            <h1>Create Blood Order Form</h1>
            
            <form onSubmit={handleSubmit}>
                <label>Patient:</label>
                <select value={patientId} onChange={(e) => setPatientId(e.target.value)}>
                    <option value="">Select</option>
                    {patients.map(p => (
                        <option key={p.patientID} value={p.patientID}>
                            {p.firstName} {p.lastName}
                        </option>
                    ))}
                </select>

                <label>Date and Time:</label>
                <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                />

                <label>Volume (mL):</label>
                <input
                    type="number"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                />

                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
        </>
    )
}

export default CreateBloodOrder
