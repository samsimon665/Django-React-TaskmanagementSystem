import { useState, useEffect } from "react";

import TaskList from "../components/tasks/TaskList";

import {
    getTasks,
    deleteTask,
    getFilteredTasks,
} from "../services/taskService";

import Navbar from "../components/layout/Navbar";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);

    const [totalTasks, setTotalTasks] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");

    const fetchTasks = async () => {

        try {

            const data = await getTasks();

            setTasks(data.results);

            setNextPage(data.next);
            setPreviousPage(data.previous);

            setTotalTasks(data.count);

        } catch (error) {

            console.error(error);

        }
    };

    const handleDelete = async (taskId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteTask(taskId);

            fetchTasks();

        } catch (error) {

            console.error(error);

            alert("Failed to delete task");

        }
    };

    useEffect(() => {

        fetchTasks();

    }, []);

    useEffect(() => {

        const applyFilters = async () => {

            try {

                const data =
                    await getFilteredTasks(
                        searchTerm,
                        statusFilter,
                        priorityFilter,
                        currentPage
                    );

                setTasks(data.results);

                setNextPage(data.next);
                setPreviousPage(data.previous);

                setTotalTasks(data.count);

            } catch (error) {

                console.error(error);

            }
        };

        applyFilters();

    }, [
        searchTerm,
        statusFilter,
        priorityFilter,
        currentPage
    ]);

    const startTask = ((currentPage - 1) * 6) + 1;

    const endTask = Math.min(
        currentPage * 6,
        totalTasks
    );

    return (
        <>
            <Navbar />

            <div className="container">

                <h2 className="mb-2">
                    My Tasks
                </h2>

                <p className="text-muted">
                    Showing {startTask} - {endTask} of {totalTasks} tasks
                </p>

                <div className="row mb-4">

                    <div className="col-md-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Tasks..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-4">

                        <select
                            className="form-select"
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                        >
                            <option value="">
                                All Status
                            </option>

                            <option value="pending">
                                Pending
                            </option>

                            <option value="completed">
                                Completed
                            </option>

                        </select>

                    </div>

                    <div className="col-md-4">

                        <select
                            className="form-select"
                            value={priorityFilter}
                            onChange={(e) =>
                                setPriorityFilter(e.target.value)
                            }
                        >
                            <option value="">
                                All Priority
                            </option>

                            <option value="high">
                                High
                            </option>

                            <option value="medium">
                                Medium
                            </option>

                            <option value="low">
                                Low
                            </option>

                        </select>

                    </div>

                </div>

                <TaskList
                    tasks={tasks}
                    onDelete={handleDelete}
                />

                <div className="d-flex justify-content-center mt-4">

                    <button
                        className="btn btn-outline-primary me-2"
                        disabled={!previousPage}
                        onClick={() =>
                            setCurrentPage(
                                currentPage - 1
                            )
                        }
                    >
                        Previous
                    </button>

                    <button
                        className="btn btn-outline-primary"
                        disabled={!nextPage}
                        onClick={() =>
                            setCurrentPage(
                                currentPage + 1
                            )
                        }
                    >
                        Next
                    </button>

                </div>

            </div>

        </>
    );
}

export default Dashboard;