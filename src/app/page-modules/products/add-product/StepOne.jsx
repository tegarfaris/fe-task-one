import { useState, useEffect } from "react";

const StepOne = ({ onNext }) => {
  const [form, setForm] = useState({ name: "", price: "" });
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    const valid =
      form.name.trim() !== "" &&
      form.name.trim().length <= 30 &&
      form.price.trim() !== "";
    setIsValid(valid);
  }, [form]);

  const handleNext = () => {
    if (isValid) {
      onNext(form);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow border border-gray-200 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Step 1: Product Information
      </h2>
      <div className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name (max 30 chars)"
            maxLength={30} // agar user tidak bisa ketik lebih dari 30
            className="w-full p-2 border rounded focus:ring-2 focus:outline-none border-gray-300 focus:ring-blue-600"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Enter product price"
            className="w-full p-2 border rounded focus:ring-2 focus:outline-none border-gray-300 focus:ring-blue-600"
            value={form.price}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!isValid}
          className={`px-5 py-2 rounded-md transition ${
            isValid
              ? "bg-gray-900 text-white hover:bg-blue-800"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default StepOne;
