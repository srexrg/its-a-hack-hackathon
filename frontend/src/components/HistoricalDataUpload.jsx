import { useState } from "react";

const HistoricalDataUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    // Simulate successful upload
    console.log("Uploading file:", file.name);
    alert("File uploaded successfully!");
  };

  return (
    <section className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Upload Historical Data
      </h2>
      <div className="space-y-6">
        <div className="flex items-center justify-center w-full">
          <label
            className="flex flex-col items-center w-full py-6 px-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition duration-200 ease-in-out"
          >
            <svg
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16v-8m0 0h10m-10 0L12 3l5 5M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h3m10 0h3a2 2 0 012 2v12a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-gray-500 text-lg">
              {file ? file.name : "Click to select a file (CSV, XLSX)"}
            </span>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".csv,.xlsx"
              className="hidden"
            />
          </label>
        </div>

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Upload Data
        </button>
      </div>
    </section>
  );
};

export default HistoricalDataUpload;
