/* eslint-disable no-unused-vars */
import { useState } from "react";
import Header from "./components/Header";
import DeliveryTimeEstimator from "./components/DeliveryTimeEstimator";
import HistoricalDataUpload from "./components/HistoricalDataUpload";
import PerformanceTracker from "./components/PerformanceTracker";

function App() {
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [performanceData, setPerformanceData] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DeliveryTimeEstimator setEstimatedTime={setEstimatedTime} />
          <HistoricalDataUpload />
        </div>
        <div className="mt-8">
          <PerformanceTracker performanceData={performanceData} />
        </div>
      </main>
    </div>
  );
}

export default App;
