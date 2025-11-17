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


const PORT = YOUR_BACKEND_PORT;

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
app.get('/patients', async (req, res) => {
    try {
        // TODO: SQL to load all patients

        res.status(200).json([]);  // TODO: add actual data returned

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});

app.get('/patients/:patientId', async (req, res) => {
    const {patientId} = req.params
    try {
        // TODO: SQL to load one patient

        res.status(200).json([]);  // TODO: add actual data returned

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});

app.get('/appointments', async (req, res) => {
    try {
        // TODO: SQL to load appointments

        res.status(200).json([]);  // TODO: add actual data returned

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});

app.get('/BloodOrders', async (req, res) => {
    try {
        // TODO: SQL to load all blood orders

        res.status(200).json([]);  // TODO: add actual data returned

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});

app.get('/nurses', async (req, res) => {
    try {
        // TODO: SQL to load all nurses

        res.status(200).json([]);  // TODO: add actual data returned

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});

app.get('/requirements', async (req, res) => {
    try {
        // TODO: SQL to load all special requirements

        res.status(200).json([]);  // TODO: add actual data returned

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});

app.get('/requirements/:patientId', async (req, res) => {
    const {patientId} = req.params
    try {
        // TODO: SQL to load requirements for one patient

        res.status(200).json([]);  // TODO: add actual data returned

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});


app.get('/requirements/:patientId:requirementId', async (req, res) => {
    const {patientId, requirementId} = req.params

    try {
        // TODO: SQL to delete from the intersection table

        res.status(200).json({message: "requirement deleted"});  

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});

// for RESET button

app.post('/reset', async (req, res) => {
    try {
        // TODO: SQL to RESET tables to original sample data

        res.status(200).json({message: "requirement deleted"});  

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("Failed to reset database");
    }

});





// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
