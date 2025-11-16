import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function CreateAppointment({backendURL}) {

    //for when user cancels form transaction
    const navigate = useNavigate()

    //extract patient ID from link /appointements/new/:patientID
    const { patientId } = useParams();

    const [patient, setPatient] = useState("")
    const [dateTime, setDateTime] = useState("")
    const [orderID, setOrderID] = useState("")
    const [nurseID, setNurseID] = useState("")
    const [isConfirmed, setIsConfirmed] = useState(0)

    // for loading dropdown values
    const [orders, setOrders] = useState([])
    const [nurses, setNurses] = useState([])

    //fetch patient data to use for loading values in dropdown menus
    useEffect(() => {
        loadPatient()
        loadOrders()
        loadNurses()
    }, [patientId, backendURL]);

     async function loadPatient() {
            try {
                const response = await fetch(`${backendURL}/patients/${patientId}`)
                const data = await response.json()
                setPatient(data)
            } catch (err) {
                console.log("Failed to fetch patient data")
            }
     }

     async function loadOrders() {
        try {
            const response = await fetch(`${backendURL}/orders/${patientId}`)
            const data = await response.json()
            setOrders(data)
        } catch (err) {
            console.log("Error loading orders", err)
        }
    }


    async function loadNurses() {
        try {
            const response = await fetch(`${backendURL}/nurses`)
            const data = await response.json()
            setNurses(data);
        } catch (err) {
            console.log("Error loading nurses", err)
        }
    }



    //save appointment data to database, not hooked 
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await fetch(`${backendURL}/appointments`, {
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

            console.log("Saved to backend!")
            navigate("/Appointments")
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
                    {/*map order IDs for selected patient to dropdown options */}
                    {orders.map(order => (
                        <option key={order.orderID} value={order.orderID}>
                            {order.orderID}
                        </option>
                    ))}
                </select>

                <label>Nurse:</label>
                <select value={nurseID} onChange={(e) => setNurseID(e.target.value)} >
                    <option value="">Select</option>
                    {/* load nurse names from the database */}
                    {nurses.map(n => (
                        <option key={n.nurseID} value={n.nurseID}>
                            {n.nurseName}
                        </option>
                    ))}
                </select>

                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </>
    )
}

export default CreateAppointment