import { Link } from "react-router-dom";

function BloodOrders() {
    return (
        <>
            <h1>Blood Orders page</h1>
            <div className="homepageDescription">
                <p>Will display all blood orders and a button that links to a form to create a new blood order.</p>
            </div>
            <button>
                <Link to="/bloodorder/new"> Create Blood Order</Link>
            </button>
        </>
    )
} export default BloodOrders;