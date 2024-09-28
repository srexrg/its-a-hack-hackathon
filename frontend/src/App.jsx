/* eslint-disable no-unused-vars */
import { useState } from "react";
import Header from "./components/Header";
import DeliveryTimeEstimator from "./components/DeliveryTimeEstimator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <DeliveryTimeEstimator />
        </div>
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
