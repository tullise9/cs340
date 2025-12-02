import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function EditPatient({ backendURL }) {

    const navigate = useNavigate()
    const { patientId } = useParams()

    const [ID, setID] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [weight, setWeight] = useState("")
    const [DOB, setDOB] = useState("")

    useEffect(() => {
        async function loadPatient() {
            try {
                const response = await fetch(`${backendURL}/patients/${patientId}`)
                const data = await response.json()
                setID(data.patientID)
                setFirstName(data.firstName)
                setLastName(data.lastName)
                setPhoneNumber(data.phoneNumber)
                setWeight(data.weight)
                const formattedDOB = new Date(data.dateOfBirth).toISOString().split("T")[0]
                setDOB(formattedDOB)

            } catch (err) {
                console.log("Backend not ready, but page working", err)
            }
        }

        loadPatient()
    }, [patientId, backendURL])

    async function handleSubmit(e) {
        e.preventDefault()
        console.log("PUT URL: ", `${backendURL}/patients/${patientId}`)

        try {
            await fetch(`${backendURL}/patients/${patientId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    patientID: ID,
                    firstName,
                    lastName,
                    phoneNumber,
                    weight,
                    dateOfBirth: DOB
                })
            })

            console.log("Patient updated successfully")
            navigate("/Patients")
        } catch (err) {
            console.log("Error updating patient", err)
        }
    }

    function handleCancel() {
        navigate("/Patients")
    }

    return (
        <>
         <div className="form-container">
            <h1>Edit Patient </h1>
            <form onSubmit={handleSubmit}>
                <label>Patient ID:</label>
                <input value={ID} onChange={(e) => setID(e.target.value)} />

                <label>First Name:</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                <label>Last Name:</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} />

                <label>Phone Number:</label>
                <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

                <label>Weight:</label>
                <input value={weight} onChange={(e) => setWeight(e.target.value)} />

                <label>Date of Birth:</label>
                <input type="date" value={DOB} onChange={(e) => setDOB(e.target.value)} />

                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
            </div>
        </>
    )
}

export default EditPatient
