import { useState } from "react";

const DeliveryTimeEstimator = ({ setEstimatedTime }) => {
  const [distance, setDistance] = useState("");
  const [packageSize, setPackageSize] = useState("medium");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate a backend response for the estimated time
    const simulatedResponse = Math.round(
      distance *
        0.1 *
        (packageSize === "large" ? 1.2 : packageSize === "small" ? 0.8 : 1)
    );
    setEstimatedTime(simulatedResponse);
  };

  return (
    <section className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Estimate Delivery Time
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="distance"
            className="block text-lg font-medium text-gray-700"
          >
            Distance (km):
          </label>
          <input
            type="number"
            id="distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            required
            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg p-3"
            placeholder="Enter distance"
          />
        </div>
        <div>
          <label
            htmlFor="packageSize"
            className="block text-lg font-medium text-gray-700"
          >
            Package Size:
          </label>
          <select
            id="packageSize"
            value={packageSize}
            onChange={(e) => setPackageSize(e.target.value)}
            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg p-3"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Estimate Time
        </button>
      </form>
    </section>
  );
};

export default DeliveryTimeEstimator;
