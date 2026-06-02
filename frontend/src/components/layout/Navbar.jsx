import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/login");
    };

    return (

        <nav className="navbar navbar-dark bg-dark mb-4">

            <div className="container">

                <span className="navbar-brand">
                    Task Manager
                </span>

                <div>

                    <Link
                        to="/dashboard"
                        className="btn btn-secondary me-2"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/tasks/create"
                        className="btn btn-primary me-2"
                    >
                        Create Task
                    </Link>

                    <Link
                        to="/chat"
                        className="btn btn-outline-info me-2"
                    >
                        AI Assistant
                    </Link>

                    <button
                        className="btn btn-danger"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );
}

export default Navbar;