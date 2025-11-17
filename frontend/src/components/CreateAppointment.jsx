import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function CreateAppointment({ backendURL }) {
  const navigate = useNavigate()
  const { patientId } = useParams()

  const [patient, setPatient] = useState("")
  const [dateTime, setDateTime] = useState("")
  const [orderID, setOrderID] = useState("")
  const [nurseID, setNurseID] = useState("")
  const [isConfirmed, setIsConfirmed] = useState(0)

  const [orders, setOrders] = useState([])
  const [nurses, setNurses] = useState([])

  useEffect(() => {
    async function loadPatient() {
      try {
        const response = await fetch(`${backendURL}/patients/${patientId}`)
        const data = await response.json()
        setPatient(data)
      } catch (err) {
        console.log("Failed to fetch patient data", err)
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
        setNurses(data)
      } catch (err) {
        console.log("Error loading nurses", err)
      }
    }

    loadPatient()
    loadOrders()
    loadNurses()
  }, [patientId, backendURL])

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
          nurseID
        })
      })

      console.log("Saved to backend!")
      navigate("/Appointments")
    } catch (err) {
      console.log("Backend offline — appointment not saved, but UI works.", err)
    }
  }

  function handleCancel() {
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

        <label>Order ID:</label>
        <select value={orderID} onChange={(e) => setOrderID(e.target.value)}>
          <option value="">Select</option>
          {orders.map(order => (
            <option key={order.orderID} value={order.orderID}>{order.orderID}</option>
          ))}
        </select>

        <label>Nurse:</label>
        <select value={nurseID} onChange={(e) => setNurseID(e.target.value)}>
          <option value="">Select</option>
          {nurses.map(n => (
            <option key={n.nurseID} value={n.nurseID}>{n.nurseName}</option>
          ))}
        </select>

        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </>
  )
}

export default CreateAppointment
