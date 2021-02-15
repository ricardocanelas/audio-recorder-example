import { RiDeleteBin5Line, RiFileDownloadLine } from "react-icons/ri";

const isAudio = (type) => ["audio", "video/webm"].includes(type);

const FilePreview = ({ file, onRemove }) => {
  const handleRemove = (e) => onRemove(file, e);

  return (
    <div className="relative mr-6 mb-5 bg-white shadow-lg rounded-md p-2">
      <div
        className="absolute bg-gray-50 flex"
        style={{ top: 6, right: 6, padding: 2 }}
      >
        <a className="mr-1" href={file.preview} download>
          <RiFileDownloadLine />
        </a>
        <div
          tabIndex="0"
          role="button"
          aria-pressed="false"
          onClick={handleRemove}
        >
          <RiDeleteBin5Line />
        </div>
      </div>
      {isAudio(file.type) && (
        <div className="pt-6 pb-2">
          <audio src={file.preview} controls />
        </div>
      )}
      {!isAudio(file.type) && (
        <img
          src={file.preview}
          height="140"
          style={{
            width: "100px",
            height: "100px",
            maxHeight: 100,
            display: "block",
            objectFit: "cover",
          }}
        />
      )}
    </div>
  );
};

export default FilePreview;
