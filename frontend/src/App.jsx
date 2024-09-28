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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Enhanced card-like components */}
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 border border-gray-200 text-gray-900">
            <DeliveryTimeEstimator />
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 border border-gray-200 text-gray-900">
            <HistoricalDataUpload />
          </div>
        </div>
        {/* <div className="mt-12 bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 border border-gray-200 text-gray-900">
          <PerformanceTracker performanceData={performanceData} />
        </div> */}
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
export default App;
