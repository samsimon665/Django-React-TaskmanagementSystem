import CreateTaskForm from "../components/tasks/CreateTaskForm";
import Navbar from "../components/layout/Navbar";

function CreateTask() {

    return (
        <>
            <Navbar />

            <div className="container">

                <h2 className="mb-4">
                    Create Task
                </h2>

                <CreateTaskForm />

            </div>
        </>
    );
}

export default CreateTask;