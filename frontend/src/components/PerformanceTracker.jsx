import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PerformanceTracker = () => {
  const [performanceData, setPerformanceData] = useState([]);

useEffect(() => {
  const fetchPerformanceData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/performance");
      setPerformanceData(response.data.accuracy_history);
      toast.info("Performance data updated");
    } catch (error) {
      console.error("Error fetching performance data:", error);
      toast.error("Error fetching performance data");
    }
  };

  fetchPerformanceData();
}, []);

  return (
    <section className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Prediction Accuracy
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
                Iteration
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
                Accuracy (%)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {performanceData.map((accuracy, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-indigo-50 transition duration-150 ease-in-out`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                  {(accuracy * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PerformanceTracker;
