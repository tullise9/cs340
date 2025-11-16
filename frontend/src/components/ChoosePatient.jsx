// Citation for the following function:
// Date: 11/05/2025
// Copied from /OR/ Adapted from /OR/ Based on: CS 290 module 4 "function and functional programming"

import { useState } from "react"
function ChoosePatient({ onSelect }) {
    const [selectedPatient, setSelectedPatient] = useState("")

    const patients = [
        { id: 1, name: "James" },
        { id: 2, name: "Cynthia" },
        { id: 3, name: "William" }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedPatient) {
            onSelect(selectedPatient)
        }
    }

    return (
        <>
            <h1>Choose Patient Form</h1>
            <p>Will display a dropdown menu of patients to choose from</p>

            <form onSubmit={handleSubmit}>
                <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
                    <option value="">Choose a patient</option>
                    {patients.map((p) => (
                        <option key={p.id} value={p.id}> {p.name} </option>
                    ))}
                </select>
                <button type="submit">Continue</button>
            </form>
        </>
    )
}

export default ChoosePatient