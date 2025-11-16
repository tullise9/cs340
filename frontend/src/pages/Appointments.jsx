import { Link } from "react-router-dom"
import { useState, useEffect } from "react";

function Appointments() {
    return (
        <>
            <h1>Appointments page</h1>
            <div className="homepageDescription">
                <p>This page will display a table containing appointment, patient, blood order and nurse information </p>
            </div>
            <button>
                <Link to="/appointments/new"> New Appointment</Link>
            </button>

        </>
    )
} export default Appointments;