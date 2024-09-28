/* eslint-disable no-unused-vars */
import { useState } from "react";
import Header from "./components/Header";
import DeliveryTimeEstimator from "./components/DeliveryTimeEstimator";
import HistoricalDataUpload from "./components/HistoricalDataUpload";
import PerformanceTracker from "./components/PerformanceTracker";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [performanceData, setPerformanceData] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col items-center">
      <Header />
      <main className="container mx-auto px-6 py-12 flex justify-center items-center flex-grow">
        <div className="w-full max-w-4xl">
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 border border-gray-200 text-gray-900">
            <DeliveryTimeEstimator />
          </div>
        </div>
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
export default App;
