import { Link } from "react-router-dom";
function Patients() {
    return (
        <>
            <h1>Patients page</h1>
            <div className="homepageDescription">
                <p>Will display a table of patients and buttons that link to forms to edit/update patient info</p>
            </div>
            <Link to="/EditPatient">Edit Patient</Link>
        </>
    )
} export default Patients;