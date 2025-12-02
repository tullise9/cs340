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
// CREATE ROUTES

app.post('/Appointments/create', async function (req, res) {
    try {
      
        let data = req.body;

        const c_appointmentDateTime = data.appointmentDateTime;
       
        const c_isConfirmed = data.isConfirmed === '1' || data.isConfirmed === true ? 1 : 0;
        
        const c_patientID = parseInt(data.patientID);
        const c_orderID = parseInt(data.orderID);
      
        const c_nurseID = parseInt(data.nurseID); 

        const c_firstName = data.firstName;
        const c_lastName = data.lastName;

        if (isNaN(c_patientID) || isNaN(c_orderID) || isNaN(c_nurseID)) {
             return res.status(400).json({ 
                error: 'Invalid Input', 
                message: 'Patient ID, Order ID, and Nurse ID must be valid numbers.' 
            });
        }
        
        const query = `CALL sp_create_Appointment(?, ?, ?, ?, ?, ?, ?, @new_id);`;

        const params = [
            c_appointmentDateTime, 
            c_isConfirmed,
            c_patientID,
            c_firstName,
            c_lastName,
            c_orderID,
            c_nurseID
        ];
       
        const [[[rows]]] = await db.query(query, params);

        const newId = rows.new_id;

        console.log(
            `CREATE Appointment. ID: ${newId}. Patient: ${c_firstName} ${c_lastName}`
        );
       
        res.status(200).json({ 
            message: 'Appointment created successfully',
            appointmentID: newId 
        });

    } catch (error) {
        console.error('Error executing CREATE Appointment query:', error);
        
        res.status(500).send(
            'An error occurred while creating the appointment.'
        );
    }
});

app.post('/bloodorders/create', async function (req, res) {
    try {
        
        let data = req.body;

        const blood_volume = parseInt(data.volume);
        
        const blood_orderDateTime = data.orderDateTime;

        const blood_isLinkedToAppointment = data.isLinkedToAppointment === '1' || data.isLinkedToAppointment === true ? 1 : 0;
        
        const blood_patientID = parseInt(data.patientID);

        if (isNaN(blood_volume) || isNaN(blood_patientID)) {
             return res.status(400).json({ 
                error: 'Invalid Input', 
                message: 'Blood Volume and Patient ID must be valid numbers.' 
            });
        }
        
        const query = `CALL sp_create_BloodOrder(?, ?, ?, ?, @new_id);`;

        const params = [
            blood_volume, 
            blood_orderDateTime,
            blood_isLinkedToAppointment,
            blood_patientID
        ];

        const [[[rows]]] = await db.query(query, params);
        
        const newId = rows.new_id;

        console.log(
            `CREATE Blood Order. ID: ${newId}. Volume: ${blood_volume}mL. Patient ID: ${blood_patientID}`
        );

        res.status(200).json({ 
            message: 'Blood Order created successfully',
            orderID: newId 
        });

    } catch (error) {
        console.error('Error executing CREATE Blood Order query:', error);
        
        res.status(500).send(
            'An error occurred while creating the blood order.'
        );
    }
});

app.post('/requirements/create', async function (req, res) {
    try {
        
        let data = req.body;

        const sp_requirment_name = data.requirementName;
        
        const sp_requirement_details = data.requirementDetails;
      
        if (!sp_requirment_name || sp_requirment_name.trim() === '') {
             return res.status(400).json({ 
                error: 'Invalid Input', 
                message: 'Requirement Name cannot be empty.' 
            });
        }
        
        const query = `CALL sp_create_special_requirement(?, ?, @new_id);`;

        const params = [
            sp_requirment_name, 
            sp_requirement_details
        ];

        const [[[rows]]] = await db.query(query, params);

        const newId = rows.new_id;

        console.log(
            `CREATE Special Requirement. ID: ${newId}. Name: ${sp_requirment_name}`
        );

        res.status(200).json({ 
            message: 'Special requirement created successfully',
            requirementID: newId 
        });

    } catch (error) {
        console.error('Error executing CREATE Special Requirement query:', error);
        
        res.status(500).send(
            'An error occurred while creating the special requirement.'
        );
    }
});

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

//UPDATE ROUTES
// UPDATE PATIENT (RESTful version)
console.log("REGISTERING PUT /patients/:patientId route");

app.put('/patients/:patientId', async function (req, res) {
    try {
        const { patientId } = req.params;
        const data = req.body;

        const up_patientID = parseInt(patientId);

        const up_firstName = data.firstName;
        const up_lastName = data.lastName;
        const up_phoneNumber = data.phoneNumber;
        const up_weight = parseInt(data.weight);
        const up_dateofBirth = data.dateOfBirth;

        if (isNaN(up_patientID) || !up_firstName || !up_lastName || isNaN(up_weight) || !up_dateofBirth) {
            return res.status(400).json({ 
                error: 'Invalid Input', 
                message: 'Patient ID, Name, Weight, and Date of Birth are required and must be valid.' 
            });
        }

        const query = 'CALL sp_update_patient(?, ?, ?, ?, ?, ?);';

        const params = [
            up_patientID,
            up_firstName,
            up_lastName,
            up_phoneNumber,
            up_weight,
            up_dateofBirth
        ];

        await db.query(query, params);

        console.log(`UPDATE Patient. ID: ${up_patientID}. New Name: ${up_firstName} ${up_lastName}`);

        res.status(200).json({ message: 'Patient updated successfully' });

    } catch (error) {
        console.error('Error executing UPDATE Patient queries:', error);
        res.status(500).send('An error occurred while executing the database queries to update the patient.');
    }
});



app.post('/requirements/update', async function (req, res) {
    try {
        
        const data = req.body;

        const sp_requirementID = parseInt(data.requirementID);

        const sp_requirement_name = data.requirementName;
        const sp_requirement_details = data.requirementDetails;

        if (isNaN(sp_requirementID) || !sp_requirement_name) {
            return res.status(400).json({ 
                error: 'Invalid Input', 
                message: 'Requirement ID and Requirement Name are required and must be valid.' 
            });
        }
        
        const query = 'CALL sp_update_special_requirements(?, ?, ?);';

        const params = [
            sp_requirementID,
            sp_requirement_name,
            sp_requirement_details
        ];

        await db.query(query, params);

        console.log(
            `UPDATE Special Requirement. ID: ${sp_requirementID}. New Name: ${sp_requirement_name}`
        );

        res.status(200).json({ message: 'Special requirement updated successfully' });
        
    } catch (error) {
        console.error('Error executing UPDATE Special Requirement queries:', error);
       
        res.status(500).send(
            'An error occurred while executing the database queries to update the special requirement.'
        );
    }
});

app.post('/bloodorders/update', async function (req, res) {
    try {
        const data = req.body;

        const blood_orderID = parseInt(data.orderID); 

        const blood_volume = parseInt(data.volume);
        
        const blood_orderDateTime = data.orderDateTime;

        const blood_isLinkedToAppointment = data.isLinkedToAppointment === '1' || data.isLinkedToAppointment === true ? 1 : 0;
        
        const blood_patientID = parseInt(data.patientID);

        if (isNaN(blood_orderID) || isNaN(blood_volume) || isNaN(blood_patientID) || !blood_orderDateTime) {
            return res.status(400).json({ 
                error: 'Invalid Input', 
                message: 'Order ID, Volume, Patient ID, and Order Date/Time are required and must be valid.' 
            });
        }
        
        const query = 'CALL sp_update_BloodOrder(?, ?, ?, ?, ?);';

        const params = [
            blood_orderID,
            blood_volume, 
            blood_orderDateTime,
            blood_isLinkedToAppointment,
            blood_patientID
        ];

        await db.query(query, params);

        console.log(
            `UPDATE Blood Order. ID: ${blood_orderID}. New Volume: ${blood_volume}mL`
        );

        res.status(200).json({ message: 'Blood order updated successfully' });
        
    } catch (error) {
        console.error('Error executing UPDATE Blood Order queries:', error);
        
        res.status(500).send(
            'An error occurred while executing the database queries to update the blood order.'
        );
    }
});
// DELETE ROUTES
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

app.post('/appointments/delete', async function (req, res) {
    try {
        let data = req.body;
       
        const d_appointmentID = parseInt(data.appointmentID);
       
        if (isNaN(d_appointmentID)) {
             return res.status(400).json({ 
                error: 'Invalid Input', 
                message: 'Appointment ID must be a valid number.' 
            });
        }
        
        const query = `CALL sp_DeleteAppointment(?);`;

        const params = [
            d_appointmentID
        ];

        await db.query(query, params);

        console.log(
            `DELETE Appointment. ID: ${d_appointmentID}`
        );

        res.status(200).json({ message: 'Appointment deleted successfully' });
        
    } catch (error) {
        console.error('Error executing DELETE Appointment query:', error);
        
        res.status(500).send(
            'An error occurred while executing the database queries to delete the appointment.'
        );
    }
});

app.post('/bloodorders/delete', async function (req, res) {
    try {
        let data = req.body;

        const d_orderID = parseInt(data.orderID);

        if (isNaN(d_orderID)) {
             return res.status(400).json({ 
                error: 'Invalid Input', 
                message: 'Blood Order ID must be a valid number.' 
            });
        }
        
        const query = `CALL sp_DeleteBlood_order(?);`;

        const params = [
            d_orderID
        ];

        await db.query(query, params);

        console.log(
            `DELETE Blood Order. ID: ${d_orderID}`
        );

        res.status(200).json({ message: 'Blood order deleted successfully' });
        
    } catch (error) {
        console.error('Error executing DELETE Blood Order query:', error);
        
        res.status(500).send(
            'An error occurred while executing the database queries to delete the blood order.'
        );
    }
});

app.post('/patients/delete', async function (req, res) {
    try {
        let data = req.body;

        const d_patientID = parseInt(data.patientID);

        if (isNaN(d_patientID)) {
             return res.status(400).json({ 
                error: 'Invalid Input', 
                message: 'Patient ID must be a valid number.' 
            });
        }
        
        const query = `CALL sp_DeletePatient(?);`;

        const params = [
            d_patientID
        ];

        await db.query(query, params);

        console.log(
            `DELETE Patient. ID: ${d_patientID}`
        );

        res.status(200).json({ message: 'Patient deleted successfully' });
        
    } catch (error) {
        console.error('Error executing DELETE Patient query:', error);
        
        res.status(500).send(
            'An error occurred while executing the database queries to delete the patient.'
        );
    }
});

app.post('/requirements/delete', async function (req, res) {
    try {
        let data = req.body;

        const d_requirmentID = parseInt(data.requirementID);

        // Basic validation for the ID
        if (isNaN(d_requirmentID)) {
             return res.status(400).json({ 
                error: 'Invalid Input', 
                message: 'Special Requirement ID must be a valid number.' 
            });
        }
        
        const query = `CALL sp_DeleteSpecial_requirment(?);`;

        const params = [
            d_requirmentID
        ];

        await db.query(query, params);

        console.log(
            `DELETE Special Requirement. ID: ${d_requirmentID}`
        );

        res.status(200).json({ message: 'Special requirement deleted successfully' });
        
    } catch (error) {
        console.error('Error executing DELETE Special Requirement query:', error);
        
        res.status(500).send(
            'An error occurred while executing the database queries to delete the special requirement.'
        );
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

