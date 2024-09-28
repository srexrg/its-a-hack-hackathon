/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DeliveryTimeEstimator = () => {
  const [distance, setDistance] = useState("");
  const [packageSize, setPackageSize] = useState("Small");
  const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [location, setLocation] = useState("");
  const [weatherCondition, setWeatherCondition] = useState("");
  const [deliveryService, setDeliveryService] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [uniqueValues, setUniqueValues] = useState({});
  const [isDataUploaded, setIsDataUploaded] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUniqueValues();
  }, [isDataUploaded]);

  const fetchUniqueValues = async () => {
    try {

      if(!isDataUploaded) return;
      const response = await axios.get("http://localhost:8000/unique-values");
      setUniqueValues(response.data);
    } catch (error) {
      console.error("Error fetching unique values:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDataUploaded) {
      toast.error("Please upload data and train the model first.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/predict", {
        distance: parseFloat(distance),
        package_size: packageSize,
        day_of_week: dayOfWeek,
        location: location,
        weather_condition: weatherCondition,
        delivery_service: deliveryService,
      });
      setEstimatedTime(response.data.estimated_time);
      setExplanation(response.data.explanation);
      toast.success("Delivery time estimated successfully!");
    } catch (error) {
      console.error("Error estimating delivery time:", error);
      if (error.response && error.response.data && error.response.data.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("Error estimating delivery time. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await axios.post("http://localhost:8000/upload-data", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Data uploaded and model trained successfully!");
        setIsDataUploaded(true);
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Error uploading file. Please try again.");
      }
    }
  };

  return (
    <section className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Delivery Time Estimator
      </h2>
      <div className="mb-6">
        <label
          htmlFor="file-upload"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Upload CSV File
        </label>
        <input
          type="file"
          id="file-upload"
          accept=".csv"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "
        />
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Distance input */}
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
        {/* Package Size dropdown */}
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
            required
            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg p-3"
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Extra Large">Extra Large</option>
          </select>
        </div>
        {/* Day of Week dropdown */}
        <div>
          <label
            htmlFor="dayOfWeek"
            className="block text-lg font-medium text-gray-700"
          >
            Day of Order:
          </label>
          <select
            id="dayOfWeek"
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            required
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
        {/* Location dropdown */}
        <div>
          <label
            htmlFor="location"
            className="block text-lg font-medium text-gray-700"
          >
            City:
          </label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg p-3"
          >
            <option value="">Select a city</option>
            {uniqueValues.location &&
              uniqueValues.location.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>
        {/* Weather Condition dropdown */}
        <div>
          <label
            htmlFor="weatherCondition"
            className="block text-lg font-medium text-gray-700"
          >
            Weather Condition:
          </label>
          <select
            id="weatherCondition"
            value={weatherCondition}
            onChange={(e) => setWeatherCondition(e.target.value)}
            required
            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg p-3"
          >
            <option value="">Select a weather condition</option>
            {uniqueValues.weather_condition &&
              uniqueValues.weather_condition.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
          </select>
        </div>
        {/* Delivery Service dropdown */}
        <div>
          <label
            htmlFor="deliveryService"
            className="block text-lg font-medium text-gray-700"
          >
            Delivery Service:
          </label>
          <select
            id="deliveryService"
            value={deliveryService}
            onChange={(e) => setDeliveryService(e.target.value)}
            required
            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg p-3"
          >
            <option value="">Select a delivery service</option>
            {uniqueValues.delivery_service &&
              uniqueValues.delivery_service.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-teal-600 hover:to-cyan-700 transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
              Estimating...
            </div>
          ) : (
            "Estimate Time"
          )}
        </button>
        {estimatedTime && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg">
            <h3 className="text-xl font-semibold text-green-800">
              Estimated Delivery Time:
            </h3>
            <p className="text-2xl font-bold text-green-900">
              {estimatedTime} Hr
            </p>
            {explanation && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-green-800">
                  Explanation:
                </h4>
                <p className="text-green-900">{explanation}</p>
              </div>
            )}
          </div>
        )}
      </form>
    </section>
  );
};

export default DeliveryTimeEstimator;