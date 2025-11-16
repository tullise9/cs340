import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function CreateAppointment() {

    //for when user cancels form transaction
    const navigate = useNavigate()

    //extract patient ID from link /appointements/new/:patientID
    const { patientId } = useParams();

    const [patient, setPatient] = useState({ name: "Sample Patient" })
    const [dateTime, setDateTime] = useState("")
    const [orderID, setOrderID] = useState("")
    const [nurseName, setNurseName] = useState("")
    const [isConfirmed, setIsConfirmed] = useState(0)

    //fetch patient data to use for loading values in dropdown menus
    useEffect(() => {
        async function loadPatient() {
            try {
                const response = await fetch(`/patients/${patientId}`)
                const data = await response.json()
                setPatient(data)
            } catch (err) {
                console.log("Backend not ready, using dummy patient")
                setPatient({
                    name: "Test Patient #" + patientId
                })
            }
        }

        loadPatient();
    }, [patientId]);

    //save appointment data to database, not hooked 
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await fetch("/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    patientId,
                    dateTime,
                    isConfirmed,
                    orderID,
                    nurseName
                }),
            })

            console.log("Saved to backend!");
        } catch (err) {
            console.log("Backend offline — appointment not saved, but UI works.");
        }
    }

    // go back to appointments page on cancel
    async function handleCancel() {
        navigate("/Appointments")
    }


    return (
        <>
            <h1>Create Appointment Form</h1>
            <p>Patient: {patient.firstName + " " + patient.lastName}</p>
            <form onSubmit={handleSubmit}>
                <label>Date and Time:</label>
                <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />

                <label>Is appointment confirmed?</label>
                <select value={isConfirmed} onChange={(e) => setIsConfirmed(Number(e.target.value))}>
                    <option value="">Select</option>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                </select>

                <label>orderID:</label>
                <select value={orderID} onChange={(e) => setOrderID(e.target.value)} >
                    <option value="">Select</option>
                    {/*TODO: map the orderID values for patients to dropdown options */}
                </select>

                <label>Nurse:</label>
                <select value={nurseName} onChange={(e) => setNurseName(e.target.value)} >
                    <option value="">Select</option>
                    {/*TODO: load nurse names from the database*/}
                </select>

                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </>
    )
}

export default CreateAppointment