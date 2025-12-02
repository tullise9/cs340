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
        const [rows] = await db.query("CALL sp_get_patients()");

        res.status(200).json(rows[0]);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.get('/patients/:patientId', async (req, res) => {
    const { patientId } = req.params;

    try {
        const [rows] = await db.query("CALL sp_get_patient_by_id(?)", [patientId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json(rows[0][0]); // return single object, not an array
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.get('/appointments', async (req, res) => {
    try {
        const [rows] = await db.query("CALL sp_get_appointments()");

        res.status(200).json(rows[0]);

    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).send("An error occurred while retrieving appointments.");
    }
});

app.get('/orders', async (req, res) => {
    try {
        const [rows] = await db.query("CALL sp_get_orders()");

        res.status(200).json(rows[0]);

    } catch (error) {
        console.error("Error loading blood orders:", error);
        res.status(500).send("An error occurred while loading blood orders.");
    }
});




app.get('/nurses', async (req, res) => {
    try {
        const [rows] = await db.query("CALL sp_get_nurses()");

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error loading nurses:", error);
        res.status(500).send("An error occurred while loading nurses.");
    }
});



app.get('/requirements', async (req, res) => {
    try {
        const [rows] = await db.query("CALL sp_get_requirements()");

        res.status(200).json(rows[0]);

    } catch (error) {
        console.error("Error loading requirements:", error);
        res.status(500).send("An error occurred while loading special requirements.");
    }
});



app.get('/requirements/:patientId', async (req, res) => {
    const { patientId } = req.params;

    try {
        const [rows] = await db.query("CALL sp_get_requirements_by_patient(?)", [patientId]);

        console.log("REQ BY PATIENT RESULT -->", rows);

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error loading patient requirements:", error);
        res.status(500).json({ error: "Failed to load patient requirements" });
    }
});


app.get('/orders/available/:patientId', async (req, res) => {
    const { patientId } = req.params;

    try {
        const [rows] = await db.query("CALL sp_get_available_orders(?)", [patientId]);
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error loading available orders:", error);
        res.status(500).send("Failed to load available orders");
    }
});


// UPDATE ROUTES
app.put('/patients/:patientId', async (req, res) => {

    const { patientId } = req.params;
    const { patientID, firstName, lastName, phoneNumber, weight, dateOfBirth } = req.body;

    console.log("PUT endpoint reached", patientId);


    try {
        await db.query(
            "CALL sp_update_patient(?, ?, ?, ?, ?, ?, ?)",
            [
                patientId,      // old ID
                patientID,      // new ID
                firstName,
                lastName,
                phoneNumber,
                weight,
                dateOfBirth
            ]
        );

        res.status(200).json({ message: "Patient updated successfully" });
    } catch (error) {
        console.error("Error updating patient:", error);
        res.status(500).send("An error occurred while updating the patient.");
    }
});


// CREATE ROUTES 
app.post('/orders', async (req, res) => {
    const { patientId, volume, dateTime } = req.body;

    console.log("POST /orders received:", req.body);

    try {
        await db.query(
            "CALL sp_create_blood_order(?, ?, ?)",
            [patientId, volume, dateTime]
        );

        res.status(201).json({ message: "Blood order successfully created" });
    } catch (error) {
        console.error("Error creating blood order:", error);
        res.status(500).send("An error occurred while creating the blood order.");
    }
});

app.post('/appointments', async (req, res) => {
    const { patientId, dateTime, isConfirmed, orderID, nurseID } = req.body;

    console.log("POST /appointments received:", req.body);

    try {
        await db.query(
            "CALL sp_create_appointment(?, ?, ?, ?, ?)",
            [patientId, dateTime, isConfirmed, orderID, nurseID]
        );

        res.status(201).json({ message: "Appointment created successfully" });
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).send("An error occurred while creating the appointment.");
    }
});

app.post('/requirements/:patientId', async (req, res) => {
    const { patientId } = req.params;
    const { requirementID } = req.body;

    console.log("POST /requirements/:patientId received:", patientId, requirementID);

    try {
        await db.query("CALL sp_add_requirement_to_patient(?, ?)", [
            patientId,
            requirementID
        ]);

        res.status(201).json({ message: "Requirement added successfully" });
    } catch (error) {
        console.error("Error adding requirement:", error);
        res.status(500).send("An error occurred while adding the requirement.");
    }
});




// DELETE ROUTES
app.delete('/requirements/:patientId/:requirementId', async (req, res) => {
    const { patientId, requirementId } = req.params;

    try {
        await db.query("CALL sp_delete_requirement(?, ?)", [
            patientId,
            requirementId
        ]);

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
