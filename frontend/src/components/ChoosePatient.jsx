// Citation for the following function:
// Date: 11/05/2025
// Copied from /OR/ Adapted from /OR/ Based on: CS 290 module 4 "function and functional programming"

import { useState, useEffect } from "react"
function ChoosePatient({ onSelect }) {
    const [selectedPatient, setSelectedPatient] = useState("")
    const [patients, setPatients] = useState([])

    useEffect(()=> {
        async function fetchPatients() {
            try{
                const response = await fetch(backendURL + "/patients")
                const data = await response.json()
                setPatients(data)
            } catch(err){
                console.error("Error fetching patients: ", err)
            }
            
        }
        console.log("Backend is not set up yet")
        fetchPatients()
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedPatient) {
            console.log("selected patient ID: ", selectedPatient)
            onSelect(selectedPatient)
        }
    }

    return (
        <>
            <h1>Choose Patient Form</h1>
            <p>Select a patient to continue</p>

            <form onSubmit={handleSubmit}>
                <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
                    <option value="">Choose a patient</option>
                    {patients.map((p) => (
                        <option key={p.patientID} value={p.patientID}> {p.firstName} {p.lastName} </option>
                    ))}
                </select>
                <button type="submit">Continue</button>
            </form>
        </>
    )
}

export default ChoosePatient