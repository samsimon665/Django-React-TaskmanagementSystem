import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";

import ProtectedRoute from "./routes/ProtectedRoute";

import EditTask from "./pages/EditTask";

import Chatbot from "./pages/Chatbot";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />

        <Route path="/tasks/create" element={<ProtectedRoute> <CreateTask /> </ProtectedRoute>} />

        <Route path="/tasks/edit/:id" element={<ProtectedRoute> <EditTask /> </ProtectedRoute>} />

        <Route path="/chat" element={ <ProtectedRoute> <Chatbot /> </ProtectedRoute> } />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;