import { useState } from "react";
import { sendMessage } from "../../services/chatService";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

function ChatWindow() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!message.trim()) return;

        const userMessage = {
            sender: "user",
            text: message,
        };

        setMessages((prev) => [...prev, userMessage]);

        const currentMessage = message;

        setMessage("");

        try {
            setLoading(true);

            const response = await sendMessage(currentMessage);

            const aiMessage = {
                sender: "ai",
                text: response.response,
            };

            setMessages((prev) => [...prev, aiMessage]);

        } catch (error) {
            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: "Something went wrong.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card p-3">

            <div
                style={{
                    height: "400px",
                    overflowY: "auto",
                    marginBottom: "15px",
                }}
            >
                {messages.map((msg, index) => (
                    <ChatMessage
                        key={index}
                        sender={msg.sender}
                        text={msg.text}
                    />
                ))}

                {loading && (
                    <div className="text-muted">
                        AI is typing...
                    </div>
                )}
            </div>

            <ChatInput
                message={message}
                setMessage={setMessage}
                handleSend={handleSend}
            />

        </div>
    );
}

export default ChatWindow;