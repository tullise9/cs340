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
        <div class="table-container">

            <Link to="/bloodorder/new" className="bb-btn">
                New Blood Order
            </Link>
            <h1>Blood Orders</h1>
            <div className="homepageDescription">
            </div>

            
            <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Volume</th>
                        <th>Order Date/Time</th>
                        <th>Linked to Appointment?</th>
                        <th>Patient</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map(order => (
                        <TableRow
                            key={order.orderID}
                            columns={[
                                order.orderID,
                                `${order.volume} mL`,
                                new Date(order.orderDateTime).toLocaleString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit"
                                }),
                                order.isLinkedToAppointment ? "Yes" : "No",
                                `${order.firstName} ${order.lastName}`
                            ]}
                        />
                    ))}
                </tbody>
            </table>
            </div>
            </div>
        </>
    )
}

export default BloodOrders

