// Citation for the following function:
// Date: 11/05/2025
// Copied from /OR/ Adapted from /OR/ Based on:
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableRow from "../components/TableRow";

function Patients({ backendURL }) {

    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        async function loadPatients() {
            try {
                const response = await fetch(`${backendURL}/patients`);
                const data = await response.json();
                setPatients(data);
            } catch (err) {
                console.error("Error loading Patients:", err);
            }
        }
        loadPatients();
    }, [backendURL]);

    return (
        <>
        <div className="table-container">
            <h1>Patients</h1>

            <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Weight</th>
                        <th>Date of Birth</th>
                        <th>Edit</th>
                    </tr>
                </thead>

                <tbody>
                    {patients.map((p) => (
                        <TableRow
                            key={p.patientID}
                            columns={[
                                p.patientID,
                                p.firstName,
                                p.lastName,
                                p.phoneNumber,
                                p.weight,
                                new Date(p.dateOfBirth).toLocaleDateString(),
                                <button onClick={() => navigate(`/editpatient/${p.patientID}`)}>Edit</button>
                            ]}
                        />
                    ))}
                </tbody>
            </table>
            </div>
            </div>
        </>
    );
}

export default Patients;
