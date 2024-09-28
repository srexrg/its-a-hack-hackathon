/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

const PerformanceTracker = ({ performanceData }) => {
  // In a real application, you would receive this data from your backend
  const mockPerformanceData = [
    { date: "2023-05-01", accuracy: 85 },
    { date: "2023-05-02", accuracy: 87 },
    { date: "2023-05-03", accuracy: 90 },
    { date: "2023-05-04", accuracy: 88 },
    { date: "2023-05-05", accuracy: 92 },
  ];

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
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
                Accuracy (%)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockPerformanceData.map((data, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-indigo-50 transition duration-150 ease-in-out`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                  {data.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                  {data.accuracy}
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
