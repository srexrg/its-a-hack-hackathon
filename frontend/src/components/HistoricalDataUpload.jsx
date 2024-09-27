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

    // Here, you would implement the actual file upload to your backend
    // For now, we'll just simulate a successful upload
    console.log("Uploading file:", file.name);
    alert("File uploaded successfully!");
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Upload Historical Data</h2>
      <div className="space-y-4">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".csv,.xlsx"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Upload
        </button>
      </div>
    </section>
  );
};

export default HistoricalDataUpload;
