import { useState } from "react";
import { createTask } from "../../services/taskService";

import { useNavigate } from "react-router-dom";




function CreateTaskForm() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [dueDate, setDueDate] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await createTask({
                title,
                description,
                priority,
                due_date: dueDate,
            });

            console.log(response);

            alert("Task Created Successfully");

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert("Failed To Create Task");

        }
    };

    return (
        <div className="card mb-4">
            <div className="card-body">

                <h4>Create Task</h4>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">
                            Title
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Priority
                        </label>

                        <select
                            className="form-select"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
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
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Create Task
                    </button>

                </form>

            </div>
        </div>
    );
}

export default CreateTaskForm;