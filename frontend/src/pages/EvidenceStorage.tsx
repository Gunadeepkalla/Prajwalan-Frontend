import CitizenLayout from "../components/CitizenLayout";
import { Upload, FileText, Image, Video } from "lucide-react";

export default function EvidenceStorage() {
  // Mock data (replace with backend data later)
  const evidenceList = [
    {
      id: "1",
      name: "incident_photo.jpg",
      type: "image",
      uploadedAt: "12 Feb 2026, 18:45",
      status: "Stored",
    },
    {
      id: "2",
      name: "audio_recording.mp3",
      type: "audio",
      uploadedAt: "12 Feb 2026, 18:47",
      status: "Stored",
    },
  ];

  return (
    <CitizenLayout>
      <h1 className="text-2xl font-semibold mb-8">
        Evidence Management
      </h1>

      {/* Upload Section */}
      <div className="bg-white border border-gray-200 rounded-md p-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="font-medium">Upload Supporting Evidence</p>
          <p className="text-sm text-gray-500 mt-1">
            Images, audio, or video files related to the incident.
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-2 bg-[#1E3A8A] text-white rounded-md hover:bg-[#1D4ED8] w-full sm:w-auto justify-center">
          <Upload size={16} />
          Upload File
        </button>
      </div>

      {/* Evidence Summary */}
      <div className="text-sm text-gray-500 mb-6">
        Total Files: {evidenceList.length}
      </div>

      {/* Evidence List */}
      {evidenceList.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-md p-6">
          <p className="text-gray-500 text-sm">
            No evidence uploaded yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {evidenceList.map((file) => (
            <div
              key={file.id}
              className="bg-white border border-gray-200 rounded-md p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                {file.type === "image" && <Image size={18} />}
                {file.type === "audio" && <FileText size={18} />}
                {file.type === "video" && <Video size={18} />}
                <p className="font-medium">{file.name}</p>
              </div>

              <p className="text-sm text-gray-500">
                Uploaded: {file.uploadedAt}
              </p>

              <span className="inline-block mt-3 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                {file.status}
              </span>

              <div className="mt-4">
                <button className="text-sm text-[#1E3A8A] hover:underline">
                  View File
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </CitizenLayout>
  );
}