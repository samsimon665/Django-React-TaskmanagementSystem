function ChatMessage({ sender, text }) {
    return (
        <div
            className={`mb-3 ${sender === "user"
                    ? "text-end"
                    : "text-start"
                }`}
        >
            <span
                className={`badge ${sender === "user"
                        ? "bg-primary"
                        : "bg-success"
                    }`}
            >
                {sender === "user" ? "You" : "AI"}
            </span>

            <div className="mt-1">
                {text}
            </div>
        </div>
    );
}

export default ChatMessage;