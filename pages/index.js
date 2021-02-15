import Head from "next/head";
import { useRef } from "react";

let recorder;

export default function Home() {
  const audioRef = useRef();

  const record = () => {
    // Request permissions to record audio
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      recorder = new MediaRecorder(stream);

      // Set record to <audio> when recording will be finished
      recorder.addEventListener("dataavailable", (e) => {
        audioRef.current.src = URL.createObjectURL(e.data);
      });

      // Start recording
      recorder.start();
    });
  };

  const stop = () => {
    // Stop recording
    recorder.stop();
    // Remove “recording” icon from browser tab
    recorder.stream.getTracks().forEach((i) => i.stop());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <div className="p-3">
          <button onClick={record}>record</button>
          {` | `}
          <button onClick={stop}>stop</button>
        </div>
        <audio ref={audioRef} controls />
      </main>
    </div>
  );
}
