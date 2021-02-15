import Head from "next/head";
import { useCallback, useState, useEffect } from "react";
import Recorder from "../components/Recorder";
import DropZone from "../components/DropZone";
import FilePreview from "../components/FilePreview";

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export default function Home() {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prev) => [
      ...prev,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          id: uid(),
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  }, []);

  const removeFile = (file) => {
    setFiles((prev) => [...prev.filter((f) => f.id !== file.id)]);
  };

  const handleStopRecorder = (e) => {
    setFiles((prev) => [
      ...prev,
      {
        id: uid(),
        preview: URL.createObjectURL(e.data),
        type: "audio",
      },
    ]);
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <div className="flex flex-col  min-h-screen">
      <Head>
        <title>Audio Recorder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Recorder onStop={handleStopRecorder} />

      <div className="flex justify-center flex-1 w-full p-8 bg-gradient-to-b from-gray-100 to-white p-10">
        {files.length >= 1 && (
          <div className="flex flex-start flex-wrap items-start">
            {files.map((file) => (
              <FilePreview key={file.id} file={file} onRemove={removeFile} />
            ))}
          </div>
        )}
      </div>

      <DropZone onDrop={onDrop} />
    </div>
  );
}
