# Sickle Cell Exchange Transfusion Management System

This project is a full-stack web application designed to manage patients, blood orders, special transfusion requirements, and appointment scheduling for sickle-cell exchange transfusions. The system includes a React frontend, an Express backend, and a MySQL/MariaDB database with stored procedures.

---

## Features

### Patients
- View all patients
- View individual patient details
- Update patient demographic information

### Blood Orders
- Create blood orders
- View all blood orders

### Appointments
- View all appointments
- Create appointments linked to patients, nurses, and blood orders

### Special Requirements
- View all special requirements

### Patients Requirements
- View all requirements for a selcted patient
- Delete requirements for a patient
- Add requiremnets for a patient

### Database Reset Functionality
A **RESET** route allows the database to be wiped and repopulated with sample data.

---

## Technology Stack

### Frontend
- React (Vite)
- React Router
- CSS 

### Backend
- Node.js
- Express.js
- CORS
- MySQL2

### Database
- MySQL / MariaDB
- Stored Procedures for all CREATE, UPDATE, DELETE operations

## Citations

### Page & Component Structure  
**Date:** 11/05/2025  
Based on materials from OSU coursework.  

**Sources:**  
- *Exploration — Web Application Technology 2*, Oregon State University (CS 340)  
  URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131  
- Concepts adapted from CS 290 Module 4, “Functions and Functional Programming”

---

### PL/SQL Assitance (AI Tools)
**Date:** 12/02/2025  
AI assistance was used to generate RESET database stored procedure.  

**Prompts used:**  
- Write me a stored procedure to reset my database, I am using mySQL. 
- Make sure the IDs return back to the originals. Here is the schema (copied and pasted image of schema).

**AI Source URL:**  
[https://chatgpt.com/share/6931e383-6644-800d-a54f-31795f83fe3c](https://chatgpt.com/share/693334b3-3fec-800d-85d2-039778da11b8

---


### CSS Styling Assistance (AI Tools)  
**Date:** 12/02/2025  
AI assistance was used to generate and refine CSS for forms, tables, and theme color styling.  

**Prompts used:**  
- “Can you write me CSS to style my form elements? I want the inputs listed vertically in a box in the center of the screen.”  
- “I want the input boxes left-aligned. My theme is blood banking so please use deep red accents.”  
- “Can you write CSS so my tables will appear with the same nice colors?”

**AI Source URL:**  
https://chatgpt.com/share/6931e383-6644-800d-a54f-31795f83fe3c

---

### AI-Generated Image  
**Date:** 12/05/2025  
An AI tool was used to create a clip-art style image for the home page of the project.  

**Prompt used:**  
- “Create a clip art image of a person receiving a blood transfusion. This will be for the home page of my sickle-cell exchange transfusion web UI.”

**AI Source URL:**  
https://chatgpt.com/share/69332ec0-73e8-800d-8f6d-08eadb90acd1




