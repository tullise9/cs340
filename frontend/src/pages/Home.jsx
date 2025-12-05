// Citation for the following function:
// Date: 11/05/2025
// Copied from /OR/ Adapted from /OR/ Based on:
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
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
            <h1>Home page</h1>
            <div className="homepageDescription">
                <button onClick={handleReset} className="bb-btn">RESET DATABASE</button>
            </div>
        </>
    );
}

export default Home;
