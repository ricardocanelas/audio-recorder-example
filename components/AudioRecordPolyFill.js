import dynamic from "next/dynamic";

const PolyFill = dynamic(
  () =>
    import("audio-recorder-polyfill").then((AudioRecord) => {
      if (AudioRecord) {
        console.log("[adding-polyfill]", AudioRecord?.default);
        window.MediaRecorder = AudioRecord.default;
      }
    }),
  {
    ssr: false,
  }
);

function hasAudioRecord() {
  if (typeof window !== "undefined") {
    console.log(
      "[has-audio-record-?]",
      window.MediaRecorder,
      typeof window.MediaRecorder === "undefined"
    );
    if (typeof window.MediaRecorder === "undefined") {
      return false;
    }
  }
  return true;
}

const AudioRecordPolyFill = () => {
  console.log("[checking-polyfill]");
  if (hasAudioRecord()) return <PolyFill />;
  else null;
};

export default AudioRecordPolyFill;
