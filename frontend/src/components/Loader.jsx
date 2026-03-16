const Loader = ({ text = "Loading data... Please wait" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-700 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-700 font-medium">{text}</p>
      <p className="text-sm text-gray-500 mt-2">
        First load may take a little longer while the server wakes up.
      </p>
    </div>
  );
};

export default Loader;