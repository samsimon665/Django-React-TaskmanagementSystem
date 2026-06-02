import Navbar from "../components/layout/Navbar";
import ChatWindow from "../components/chat/ChatWindow";

function Chatbot() {
    return (
        <>
            <Navbar />

            <div className="container mt-4">
                <h2>AI Assistant</h2>

                <ChatWindow />
            </div>
        </>
    );
}

export default Chatbot;