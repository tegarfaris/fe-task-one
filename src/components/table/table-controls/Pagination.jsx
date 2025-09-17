const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-end items-center gap-4 mt-6">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-900 text-white"
        }`}
      >
        Prev
      </button>
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-900 text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
