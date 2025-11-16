import ChoosePatient from "../components/ChoosePatient"
import { useState } from "react"
import { Link } from "react-router-dom"

function PatientsBloodRquirements() {
    const [chosenPatient, setChosenPatient] = useState('')

    return (
        <>
            <h1>Patients Blood Requirements Page</h1>
            <div className="homepageDescription">
                <p>The blood requirements for the selected patient will be displayed as a form where requirements</p>
                <p>can be deleted or new requirements added</p>
                <p>NOTE: DELETE button will be displayed at the end of each table row</p>
            </div>
            {!chosenPatient && (
                <ChoosePatient onSelect={(id) => setChosenPatient(id)} />
            )}

            {chosenPatient && (
                <>
                    <div>A table of the patient's blood requirements will be displayed here</div>

                    {/*TODO: change the URL so it gives the patient ID AddSpecialRequirement */}
                    <Link to="/requirements/new"> Add Special Requirement</Link>

                </>
            )}
        </>
    )
} export default PatientsBloodRquirements;