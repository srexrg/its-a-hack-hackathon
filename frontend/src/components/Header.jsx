const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-12 shadow-lg">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Delivery Time Estimation Tool
        </h1>
        <p className="text-xl font-light max-w-2xl mx-auto">
          Harness the power of machine learning to predict accurate delivery times
        </p>
        <div className="mt-8 flex justify-center">
          <span className="inline-block bg-white bg-opacity-20 rounded-full px-4 py-2 text-sm font-semibold">
            Powered by AI
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;