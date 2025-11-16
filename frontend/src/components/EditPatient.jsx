import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function EditPatient() {

    //when the edit button is pressed on the patient page, send the patient information in a link to this page
    //extract the patient information and prepopulate the form 
    //save the patient information to the database 

    const navigate = useNavigate()
    const { patientId } = useParams()

    //TODO: set default values to actual patient values
    const [ID, setID] = useState(1)
    const [firstName, setFirstName] = useState("First name")
    const [lastName, setLastName] = useState("Last name")
    const [phoneNumber, setPhoneNumber] = useState("000-000-0000")
    const [weight, setWeight] = useState("100")
    const [DOB, setDOB] = useState("")

    useEffect(() => {
        async function loadPatient() {
            try {
                const response = await fetch(`/patients/${patientId}`)
                const data = await response.json()
                setID(data.patientID)
                setFirstName(data.firstName)
                setLastName(data.lastName)
                setPhoneNumber(data.phoneNumber)
                setWeight(data.weight)
                setDOB(data.dateOfBirth)
            } catch (err) {
                console.log("Backend not ready, but page working");
            }
        }

        loadPatient()
    }, [patientId])

    async function handleCancel() {
        navigate("/Patients")
    }


    return (
        <>
            <h1>Edit Patient Form</h1>
            <form>
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
                <button type="submit" onClick={handleCancel}>Cancel</button>
            </form>

        </>
    );
}


export default EditPatient