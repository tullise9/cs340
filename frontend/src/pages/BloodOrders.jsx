import { useState, useEffect } from "react"
import TableRow from "../components/TableRow"
import { Link } from "react-router-dom"

function BloodOrders({ backendURL }) {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        async function loadOrders() {
            try {
                const response = await fetch(`${backendURL}/orders`)
                const data = await response.json()
                setOrders(data)
            } catch (err) {
                console.error("Error loading blood orders:", err)
            }
        }

        loadOrders()
    }, [backendURL])

    return (
        <>
            <h1>Blood Orders</h1>
            <div className="homepageDescription">
                <p>This page displays all blood orders associated with patients</p>
            </div>

            <Link to="/bloodorder/new">
                <button>New Blood Order</button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Volume</th>
                        <th>Order Date/Time</th>
                        <th>Linked to Appointment?</th>
                        <th>Patient ID</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map(order => (
                        <TableRow
                            key={order.orderID}
                            columns={[
                                order.orderID,
                                `${order.volume} mL`,
                                order.orderDateTime,
                                order.isLinkedToAppointment ? "Yes" : "No",
                                order.patientID
                            ]}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default BloodOrders
