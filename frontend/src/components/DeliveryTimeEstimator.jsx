import { useState } from "react";

const DeliveryTimeEstimator = ({ setEstimatedTime }) => {
  const [distance, setDistance] = useState("");
  const [packageSize, setPackageSize] = useState("medium");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here, you would make an API call to your backend
    // For now, we'll simulate a response
    const simulatedResponse = Math.round(
      distance *
        0.1 *
        (packageSize === "large" ? 1.2 : packageSize === "small" ? 0.8 : 1)
    );
    setEstimatedTime(simulatedResponse);
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Estimate Delivery Time</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="distance"
            className="block text-sm font-medium text-gray-700"
          >
            Distance (km):
          </label>
          <input
            type="number"
            id="distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="packageSize"
            className="block text-sm font-medium text-gray-700"
          >
            Package Size:
          </label>
          <select
            id="packageSize"
            value={packageSize}
            onChange={(e) => setPackageSize(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Estimate Time
        </button>
      </form>
    </section>
  );
};

export default DeliveryTimeEstimator;
