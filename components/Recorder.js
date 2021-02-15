import { useRef, useState } from "react";

let recorder;

const RecorderComponent = ({ onStop }) => {
  const [recording, setRecording] = useState(false);
  // const audioRef = useRef();

  const record = () => {
    // Request permissions to record audio
    setRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      recorder = new MediaRecorder(stream);

      // Set record to <audio> when recording will be finished
      recorder.addEventListener("dataavailable", (e) => {
        if (onStop) onStop(e);
        // audioRef.current.src = URL.createObjectURL(e.data);
      });

      // Start recording
      recorder.start();
    });
  };

  const stop = () => {
    setRecording(false);
    // Stop recording
    recorder.stop();
    // Remove “recording” icon from browser tab
    recorder.stream.getTracks().forEach((i) => i.stop());
  };

  return (
    <div className="relative w-full flex flex-nowrap items-center justify-center bg-gray-100 px-3 py-5">
      <div className="mr-2">
        <button onClick={record} className="mr-2" disabled={recording}>
          {recording ? "recording" : "record"}
        </button>
        <button onClick={stop} disabled={!recording}>
          stop
        </button>
      </div>
      {/* <audio ref={audioRef} controls /> */}
    </div>
  );
};

export default RecorderComponent;