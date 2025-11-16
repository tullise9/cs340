import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Patients({backendURL}) {

    const navigate = useNavigate()

    const [patients, setPatients] = useState([])

    useEffect(() => {
            async function loadPatients() {
                try {
                    const response = await fetch(`${backendURL}/patients`)
                    const data = await response.json()
                    setPatients(data)
                } catch (err) {
                    console.error("Error loading Patients:", err)
                }
            }
    
            loadPatients()
        }, [backendURL])


    return (
        <>
            <h1>Patients page</h1>
            <div className="homepageDescription">
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Weight</th>
                        <th>Date of Birth</th>
                        <th>Edit</th>
                    </tr>
                </thead>

                <tbody>
                    {patients.map((p) => (
                        <tr key={p.patientID}>
                            <TableRow
                                columns={[
                                    p.patientID,
                                    p.firstName,
                                    p.lastName,
                                    p.phoneNumber,
                                    p.weight,
                                    p.dateOfBirth
                                ]}
                            />
                            <td>
                                <button onClick={() => navigate(`/editpatient/${p.patientID}`)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </>
    )
} export default Patients;