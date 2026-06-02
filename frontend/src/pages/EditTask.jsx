import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getTaskById,
    updateTask,
} from "../services/taskService";

import Navbar from "../components/layout/Navbar";

function EditTask() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [task, setTask] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [status, setStatus] = useState("pending");
    const [dueDate, setDueDate] = useState("");

    const fetchTask = async () => {

        try {

            const data = await getTaskById(id);

            setTask(data);

            setTitle(data.title);
            setDescription(data.description);
            setPriority(data.priority);
            setStatus(data.status);
            setDueDate(data.due_date);

        } catch (error) {

            console.error(error);

        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateTask(id, {
                title,
                description,
                priority,
                status,
                due_date: dueDate,
            });

            alert("Task Updated Successfully");

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert("Failed To Update Task");

        }
    };

    useEffect(() => {

        fetchTask();

    }, []);

    if (!task) {

        return (
            <>
                <Navbar />

                <div className="container mt-4">

                    <h3>Loading...</h3>

                </div>
            </>
        );

    }

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2>Edit Task</h2>

                <hr />

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Title
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            className="form-control"
                            rows="3"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Priority
                        </label>

                        <select
                            className="form-select"
                            value={priority}
                            onChange={(e) =>
                                setPriority(e.target.value)
                            }
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Status
                        </label>

                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                        >
                            <option value="pending">
                                Pending
                            </option>

                            <option value="completed">
                                Completed
                            </option>

                        </select>

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Due Date
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            value={dueDate}
                            onChange={(e) =>
                                setDueDate(e.target.value)
                            }
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-success"
                    >
                        Update Task
                    </button>

                </form>

            </div>
        </>
    );
}

export default EditTask;