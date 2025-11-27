import { useState, useEffect } from "react"
import TableRow from "../components/TableRow"
import { Link } from "react-router-dom"

function Nurses({ backendURL }) {
    const [nurses, setNurses] = useState([])

    useEffect(() => {
        async function loadNurses() {
            try {
                const response = await fetch(`${backendURL}/nurses`)
                const data = await response.json()
                setNurses(data)
            } catch (err) {
                console.error("Error loading nurses:", err)
            }
        }

        loadNurses()
    }, [backendURL])

    return (
        <>
        <div class="table-container">
            <h1>Nurses</h1>
            <div className="homepageDescription">
            </div>

            <Link to="/nurse/new">
                <button>New Nurse</button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <th>Nurse ID</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>

                <tbody>
                    {nurses.map(n => (
                        <TableRow
                            key={n.nurseID}
                            columns={[
                                n.nurseID,
                                n.nurseName,
                                n.phoneNumber
                            ]}
                        />
                    ))}
                </tbody>
            </table>
            </div>
        </>
    )
}

export default Nurses
