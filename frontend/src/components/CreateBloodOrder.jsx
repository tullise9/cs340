import { useState } from "react"
import { useNavigate } from "react-router-dom"

function CreateBloodOrder() {
    //for when user cancels form transaction
    const navigate = useNavigate()

    const [patientId, setPatientId] = useState({ name: "Sample Patient" })
    const [dateTime, setDateTime] = useState("")
    const [volume, setVolume] = useState("")

    //save appointment data to database, not hooked 
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await fetch("/BloodOrders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    patientId,
                    volume,
                    dateTime
                }),
            })

            console.log("Saved to backend!");
        } catch (err) {
            console.log("Backend offline — blood order not saved, but UI works.");
        }
    }

    // go back to appointments page on cancel
    async function handleCancel() {
        navigate("/BloodOrders")
    }


    return (
        <>
            <h1>Create Blood Order Form</h1>
            <form onSubmit={handleSubmit}>
                <label>Patient:</label>
                <select value={patientId} onChange={(e) => setPatientId(e.target.value)} >
                    <option value="">Select</option>
                    {/*TODO: load patient names from database, map values to patientIds*/}
                </select>

                <label>Date and Time:</label>
                <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />

                <label>Volume:</label>
                <input type="number" value={volume} onChange={(e) => setVolume(e.target.value)} />

                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </>
    )
}


export default CreateBloodOrder