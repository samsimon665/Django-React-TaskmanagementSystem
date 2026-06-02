import { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

function LoginForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await login({
                username,
                password,
            });

            localStorage.setItem("access", response.access);
            localStorage.setItem("refresh", response.refresh);

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert("Invalid Credentials");

        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">

                    <h2 className="mb-4">Login</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">
                                Username
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Login
                        </button>

                    </form>


                    <div className="text-center mt-3">
                        <p>
                            Don't have an account?{" "}
                            <Link to="/register">
                                Register
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default LoginForm;