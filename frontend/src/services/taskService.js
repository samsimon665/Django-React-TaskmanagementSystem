import api from "./api";

const API_URL = "/api/tasks/";

export const createTask = async (taskData) => {

    const response = await api.post(
        API_URL,
        taskData
    );

    return response.data;
};

export const getTasks = async (url = API_URL) => {

    const response = await api.get(url);

    return response.data;
};

export const deleteTask = async (taskId) => {

    const response = await api.delete(
        `${API_URL}${taskId}/`
    );

    return response.data;
};

export const getTaskById = async (id) => {

    const response = await api.get(
        `${API_URL}${id}/`
    );

    return response.data;
};

export const updateTask = async (id, taskData) => {

    const response = await api.put(
        `${API_URL}${id}/`,
        taskData
    );

    return response.data;
};

export const getFilteredTasks = async (
    search = "",
    status = "",
    priority = "",
    page = 1
) => {

    const response = await api.get(
        `${API_URL}?search=${search}&status=${status}&priority=${priority}&page=${page}`
    );

    return response.data;
};