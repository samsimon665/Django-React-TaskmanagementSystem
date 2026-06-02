function VoiceButton({ setMessage }) {

    const startListening = () => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition not supported.");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";

        recognition.start();

        recognition.onresult = (event) => {

            const transcript =
                event.results[0][0].transcript;

            setMessage(transcript);
        };

        recognition.onerror = (event) => {
            console.error(event);
        };
    };

    return (
        <button
            type="button"
            className="btn btn-secondary"
            onClick={startListening}
        >
            🎤
        </button>
    );
}

export default VoiceButton;