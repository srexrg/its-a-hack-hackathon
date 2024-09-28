const Header = () => {
  return (
    <header className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-12 shadow-lg">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Delivery Time Estimation Tool
        </h1>
        <p className="text-xl font-light max-w-2xl mx-auto">
          Harness the power of machine learning to predict accurate delivery times
        </p>
        <div className="mt-8 flex justify-center">
          {/* You can add additional elements here if needed */}
        </div>
      </div>
  </header>
  );
};

export default Header;