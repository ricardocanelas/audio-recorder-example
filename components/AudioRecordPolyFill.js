import dynamic from "next/dynamic";

const PolyFill = dynamic(
  () =>
    import("audio-recorder-polyfill").then((AudioRecord) => {
      if (AudioRecord) {
        window.MediaRecorder = AudioRecord.default;
      }
    }),
  {
    ssr: false,
  }
);

function hasAudioRecord() {
  if (typeof window !== "undefined") {
    if (typeof window.MediaRecorder === "undefined") {
      return false;
    }
  }
  return true;
}

const AudioRecordPolyFill = () => {
  if (hasAudioRecord()) return <PolyFill />;
  else null;
};

export default AudioRecordPolyFill;
