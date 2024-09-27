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
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Prediction Accuracy</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Accuracy (%)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockPerformanceData.map((data, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {data.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
