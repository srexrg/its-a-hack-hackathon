/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const DeliveryTimeEstimator = () => {
  const [distance, setDistance] = useState("");
const [packageSize, setPackageSize] = useState("Small");
const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [estimatedTime, setEstimatedTime] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:8000/predict", {
      distance: parseFloat(distance),
      package_size: packageSize,
      day_of_week: dayOfWeek,
    });
    setEstimatedTime(response.data.estimated_time);
    toast.success("Delivery time estimated successfully!");
  } catch (error) {
    console.error("Error estimating delivery time:", error);
    if (error.response && error.response.data && error.response.data.detail) {
      toast.error(error.response.data.detail);
    } else {
      toast.error("Error estimating delivery time. Please try again.");
    }
  }
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
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Extra Large">Extra Large</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="dayOfWeek"
            className="block text-lg font-medium text-gray-700"
          >
            Ordered Day:
          </label>
          <select
            id="dayOfWeek"
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg p-3"
          >
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Estimate Time
        </button>
        {estimatedTime && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg">
            <h3 className="text-xl font-semibold text-green-800">
              Estimated Delivery Time:
            </h3>
            <p className="text-2xl font-bold text-green-900">{estimatedTime} Hr</p>
          </div>
        )}
      </form>
    </section>
  );
};

export default DeliveryTimeEstimator;