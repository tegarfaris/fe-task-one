import { useState, useEffect } from "react";
import useJobs from "../../../hooks/useJobs";

const AddJobForm = () => {
  const { addJob } = useJobs();
  const [form, setForm] = useState({
    code: "",
    description: "",
    updateBy: "",
    updateDate: "",
    pjobTypeId: "",
  });
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    const valid =
      form.code.trim() !== "" &&
      form.code.trim().length <= 128 &&
      form.description.trim() !== "" &&
      form.description.length <= 512 &&
      form.updateBy.trim() !== "";
    setIsValid(valid);
  }, [form]);

  const handleSubmit = () => {
    if (isValid) {
      addJob({ ...form, updateDate: Date.now(), pjobTypeId: Math.random() });
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow border border-gray-200 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Form Add Job
      </h2>
      <div className="space-y-4">
        {/* CODE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CODE
          </label>
          <input
            type="text"
            name="code"
            placeholder="Enter CODE (max 128 chars)"
            maxLength={128}
            className="w-full p-2 border rounded focus:ring-2 focus:outline-none border-gray-300 focus:ring-blue-600"
            value={form.code}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="Enter Description"
            className="w-full p-2 border rounded focus:ring-2 focus:outline-none border-gray-300 focus:ring-blue-600"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* update by */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Update By
          </label>
          <input
            type="text"
            name="updateBy"
            placeholder="Enter Update By"
            className="w-full p-2 border rounded focus:ring-2 focus:outline-none border-gray-300 focus:ring-blue-600"
            value={form.updateBy}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`px-5 py-2 rounded-md transition ${
            isValid
              ? "bg-gray-900 text-white hover:bg-blue-800"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddJobForm;
