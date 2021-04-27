import { useState } from "react";
import AudioRecordPolyFill from "./AudioRecordPolyFill";

let recorder;

const RecorderComponent = ({ onStop }) => {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState(false);
  // const audioRef = useRef();

  const record = () => {
    // Request permissions to record audio
    setRecording(true);
    setError(null);

    console.log("%c--logs--", "color:gray");
    console.log("[navigator]", navigator);
    console.log("[mediaDevices]", navigator?.mediaDevices);
    console.log("[getUserMedia]", navigator?.mediaDevices?.getUserMedia);
    console.log("[MediaRecorder]", MediaRecorder);
    console.log("[window.MediaRecorder]", window.MediaRecorder);

    // camera and microphone requires an https connection to work
    if (
      navigator &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    ) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          try {
            recorder = new window.MediaRecorder(stream);

            // Set record to <audio> when recording will be finished
            recorder.addEventListener("dataavailable", (e) => {
              if (onStop) onStop(e);
              // audioRef.current.src = URL.createObjectURL(e.data);
            });

            // Start recording
            recorder.start();
          } catch (err) {
            setError("recorder failed: ", err);
          }
        })
        .catch((err) => {
          setError("capture failed: ", err);
        });
    }
  };

  const stop = () => {
    setRecording(false);
    if (recorder) {
      try {
        // Stop recording
        recorder.stop();
        // Remove “recording” icon from browser tab
        recorder.stream.getTracks().forEach((i) => i.stop());
      } catch (err) {
        setError("stop to record failed: ", err);
      }
    }
  };

  return (
    <>
      <AudioRecordPolyFill />
      <div className="relative w-full flex flex-nowrap items-center justify-center bg-gray-100 px-3 py-5">
        <div className="mr-2">
          <button onClick={record} className="mr-2" disabled={recording}>
            {recording ? "recording" : "record"}
          </button>
          <button onClick={stop} disabled={!recording}>
            stop
          </button>
        </div>
        {error && (
          <div>
            <b>Error: </b>
            {error}
          </div>
        )}
        {/* <audio ref={audioRef} controls /> */}
      </div>
    </>
  );
};

export default RecorderComponent;
