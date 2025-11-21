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
                <button onClick={handleReset}>RESET DATABASE</button>
            </div>
        </>
    );
}

export default Home;
