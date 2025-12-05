// Citation for the following function:
// Date: 11/05/2025
// Copied from /OR/ Adapted from /OR/ Based on:
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131

/* Citation for use of AI Tools:
Date: 12/05/2025
      Prompts used to generate image
      Create an clip art image of a person receiving a blood transfusion. 
      This will be for the home page of my sickle cells exchange transfusion web UI.
        AI Source URL: https://chatgpt.com/share/69332ec0-73e8-800d-8f6d-08eadb90acd1
Links to an external site. 
*/

import transfusionImage from "../assets/transfusionImage.jpg"

function Home({ backendURL }) {   // <-- must destructure props
    async function handleReset() {
        try {
            const response = await fetch(`${backendURL}/reset`, {
                method: "POST"
            });

            if (response.ok) {
                alert("Database reset successfully!");
                window.location.reload();
            } else {
                alert("Reset failed.");
            }
        } catch (err) {
            console.error("Error resetting database:", err);
        }
    }

    return (
        <>
            <h1 className="home-header">Sickle Cell Exchange Transfusion Tracking</h1>

            <div className="homepageDescription">
                <button onClick={handleReset} className="bb-btn">RESET DATABASE</button>
            </div>


            <div className="website-description">
                <p className="home-description">
                    This system allows clinicians and blood bankers to efficiently manage patient information,
                    track and create blood orders, review transfusion requirements, and ensure accurate
                    documentation for every sickle cell exchange appointment.
                </p>
                <img src={transfusionImage} alt="Patient receiving transfusion" className="transfusion-image" />
            </div>

        </>
    );
}

export default Home;
