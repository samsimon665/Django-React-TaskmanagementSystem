function TaskList({ tasks, onDelete }) {

    if (tasks.length === 0) {

        return (

            <div className="card text-center p-5">

                <h4>📋 No Tasks Found</h4>

                <p className="text-muted">
                    Create your first task.
                </p>

            </div>

        );
    }

    return (

        <div className="row">

            {tasks.map((task) => (

                <div
                    key={task.id}
                    className="col-md-6 col-lg-4 mb-4"
                >

                    <div className="card h-100 shadow-sm">

                        <div className="card-body">

                            <h5 className="card-title">
                                {task.title}
                            </h5>

                            <h6 className="card-subtitle mb-2 text-muted">
                                Due: {task.due_date}
                            </h6>

                            <p className="card-text">
                                {task.description}
                            </p>

                            <div className="mb-3">

                                <span className="badge bg-warning text-dark me-2">
                                    {task.priority}
                                </span>

                                <span className="badge bg-info text-dark">
                                    {task.status}
                                </span>

                            </div>

                            <div>

                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() =>
                                        window.location.href =
                                        `/tasks/edit/${task.id}`
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => onDelete(task.id)}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            ))}

        </div>

    );
}

export default TaskList;