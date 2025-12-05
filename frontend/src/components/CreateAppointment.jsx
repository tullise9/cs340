// Citation for the following function:
// Date: 11/05/2025
// Copied from /OR/ Adapted from /OR/ Based on:
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
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

    async function loadAvailableOrders() {
      try {
        const response = await fetch(`${backendURL}/orders/available/${patientId}`)
        const data = await response.json()
        setOrders(data)
      } catch (err) {
        console.log("Error loading available orders", err)
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
    loadAvailableOrders()
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

      console.log("Saved appointment to backend!")
      navigate("/Appointments")
    } catch (err) {
      console.log("Error saving appointment.", err)
    }
  }

  function handleCancel() {
    navigate("/Appointments")
  }

  return (
    <>
      <div className="form-container">
        <h1>New Appointment Form</h1>
        <h3>Patient: {patient.firstName} {patient.lastName}</h3>

        <form onSubmit={handleSubmit}>
          <label>Date and Time:</label>
          <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />

          <label>Is appointment confirmed?</label>
          <select value={isConfirmed} onChange={(e) => setIsConfirmed(Number(e.target.value))}>
            <option value="">Select</option>
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>

          <label>Order:</label>
          <select value={orderID} onChange={(e) => setOrderID(e.target.value)}>
            <option value="">Select</option>
            {orders.length === 0 && (
              <option disabled>No available orders</option>
            )}
            {orders.map(order => (
              <option key={order.orderID} value={order.orderID}>
                {order.orderID} — {order.volume} mL
              </option>
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
      </div>
    </>
  )
}

export default CreateAppointment
