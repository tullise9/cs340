// Citation for the following function:
// Date: 11/05/2025
// Copied from /OR/ Adapted from /OR/ Based on:
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
// ########################################
// ########## SETUP

// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests


const PORT = 6391;

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
app.get('/patients', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                patientID,
                firstName,
                lastName,
                phoneNumber,
                weight,
                dateOfBirth
            FROM Patients;
        `);

        res.status(200).json(rows);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.get('/patients/:patientId', async (req, res) => {
    const { patientId } = req.params;

    try {
        const [rows] = await db.query(
            `
            SELECT 
                patientID,
                firstName,
                lastName,
                phoneNumber,
                weight,
                dateOfBirth
            FROM Patients
            WHERE patientID = ?;
            `,
            [patientId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json(rows[0]); // return single object, not an array
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.get('/appointments', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                A.appointmentID,
                A.appointmentDateTime,
                A.isConfirmed,
                A.patientID,
                P.firstName,
                P.lastName,
                A.orderID,
                N.nurseName
            FROM Appointments A
            JOIN Patients P ON A.patientID = P.patientID
            LEFT JOIN Nurses N ON A.nurseID = N.nurseID
            ORDER BY A.appointmentDateTime;
        `);

        res.status(200).json(rows);

    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).send("An error occurred while retrieving appointments.");
    }
});

app.get('/orders', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                B.orderID,
                B.volume,
                B.orderDateTime,
                B.isLinkedToAppointment,
                B.patientID,
                P.firstName,
                P.lastName
            FROM Blood_orders B
            LEFT JOIN Patients P ON B.patientID = P.patientID
            ORDER BY B.orderDateTime DESC;
        `);

        res.status(200).json(rows);

    } catch (error) {
        console.error("Error loading blood orders:", error);
        res.status(500).send("An error occurred while loading blood orders.");
    }
});




app.get('/nurses', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                nurseID,
                nurseName,
                phoneNumber
            FROM Nurses;
        `);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error loading nurses:", error);
        res.status(500).send("An error occurred while loading nurses.");
    }
});



app.get('/requirements', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                requirementID,
                requirementName,
                requirementDetails AS requirementDescription
            FROM Special_requirements;
        `);

        res.status(200).json(rows);

    } catch (error) {
        console.error("Error loading requirements:", error);
        res.status(500).send("An error occurred while loading special requirements.");
    }
});



app.get('/requirements/:patientId', async (req, res) => {
    const { patientId } = req.params;

    try {
        const [rows] = await db.query(`
            SELECT 
                pr.requirementID,
                sr.requirementName,
                sr.requirementDetails AS requirementDescription,
                p.firstName,
                p.lastName
            FROM Patients_requirements pr
            JOIN Special_requirements sr ON pr.requirementID = sr.requirementID
            JOIN Patients p ON pr.patientID = p.patientID
            WHERE pr.patientID = ?;
        `, [patientId]);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error loading patient requirements:", error);
        res.status(500).send("An error occurred while loading patient requirements.");
    }
});





app.delete('/requirements/:patientId/:requirementId', async (req, res) => {
    const { patientId, requirementId } = req.params;

    try {
        await db.query(`
            DELETE FROM Patients_requirements
            WHERE patientID = ? AND requirementID = ?;
        `, [patientId, requirementId]);

        res.status(200).json({ message: "Requirement removed successfully" });
    } catch (error) {
        console.error("Error deleting requirement:", error);
        res.status(500).send("An error occurred while deleting the requirement.");
    }
});



// // for RESET button
// RESET DATABASE ROUTE
app.post('/reset', async (req, res) => {
    try {
        await db.query("CALL sp_reset_database();");
        console.log("Database reset successfully!");
        res.status(200).json({ message: "Database reset successfully" });
    } catch (error) {
        console.error("Error resetting database:", error);
        res.status(500).json({ message: "Failed to reset database" });
    }
});






// // ########################################
// // ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
