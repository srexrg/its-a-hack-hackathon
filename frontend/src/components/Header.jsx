const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-8 shadow-lg">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Delivery Time Estimation Tool
        </h1>
        <p className="mt-4 text-xl font-light">
          Predict delivery times with machine learning
        </p>
        {/* Optional: Add a subtle underline or border */}
        <div className="mt-4 border-t-2 border-white w-24 mx-auto"></div>
      </div>
    </header>
  );
};

export default Header;
