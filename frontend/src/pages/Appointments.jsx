import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import TableRow from "../components/TableRow";

function Appointments({ backendURL }) {
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        async function loadAppointments() {
            try {
                const response = await fetch(`${backendURL}/appointments`)
                const data = await response.json()
                setAppointments(data)
            } catch (err) {
                console.error("Error loading appointments:", err)
            }
        }

        loadAppointments()
    }, [backendURL])

    return (
        <>
            
            <div className="homepageDescription">
            </div>
            <button>
                <Link to="/appointments/new" className="bb-btn"> New Appointment</Link>
            </button>
        <div class="table-container">
            <h1>Appointments</h1>
            <table>
                <thead>
                    <tr>
                        <th>Appointment ID</th>
                        <th>Date and Time</th>
                        <th>Confirmed?</th>
                        <th>Patient ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Order ID</th>
                        <th>Nurse</th>
                    </tr>
                </thead>

                <tbody>
                    {appointments.map((appt) => (
                        <TableRow
                            key={appt.appointmentID}
                            columns={[
                                appt.appointmentID,
                                new Date(appt.appointmentDateTime).toLocaleString(),
                                appt.isConfirmed ? "Yes" : "No",
                                appt.patientID,
                                appt.firstName,
                                appt.lastName,
                                appt.orderID,
                                appt.nurseName
                            ]}
                        />
                    ))}
                </tbody>
            </table>
        </div>

        </>
    )
} export default Appointments;