import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

function Dashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");
    };

    return (
        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center">

                <h1>Dashboard</h1>

                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Dashboard;