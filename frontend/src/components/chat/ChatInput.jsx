import VoiceButton from "./VoiceButton";



function ChatInput({
    message,
    setMessage,
    handleSend,
}) {
    return (
        <div className="d-flex gap-2">

            <input
                type="text"
                className="form-control"
                placeholder="Ask about your tasks..."
                value={message}
                onChange={(e) =>
                    setMessage(e.target.value)
                }
            />

            <VoiceButton
                setMessage={setMessage}
            />

            <button
                className="btn btn-primary"
                onClick={handleSend}
            >
                Send
            </button>

        </div>
    );
}

export default ChatInput;