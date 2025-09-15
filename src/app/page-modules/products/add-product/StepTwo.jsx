import { useState } from "react";

const StepTwo = ({ onSubmit, prevData }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB");
      setFile(null);
    } else {
      setError("");
      setFile(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (file) {
      onSubmit({ ...prevData, attachment: file.name });
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow border border-gray-200 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Step 2: Upload Document
      </h2>
      <div className="space-y-2">
        <input
          type="file"
          className="w-full border border-gray-300 rounded p-2 text-sm text-gray-600"
          onChange={handleFileChange}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!file || error}
          className={`px-5 py-2 rounded-md transition ${
            file && !error
              ? "bg-gray-900 text-white hover:bg-green-800"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Submit ✓
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
