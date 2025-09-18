import { useState, useEffect } from "react";
import useJobs from "../../../hooks/useJobs";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../../components/breadcrumb/Breadcrumb";

const initialFormState = {
  code: "",
  description: "",
  updateBy: "",
  updateDate: "",
  pjobTypeId: "",
};

const JobForm = () => {
  const { pjobTypeId } = useParams();
  const { addJob, updateJob, getDetailJob, detailJob } = useJobs();

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (pjobTypeId) {
      getDetailJob(pjobTypeId);
    } else {
      setForm(initialFormState);
    }
  }, [pjobTypeId, getDetailJob]);

  useEffect(() => {
    if (pjobTypeId && detailJob) {
      setForm({
        code: detailJob.code || "",
        description: detailJob.description || "",
        updateBy: detailJob.updateBy || "",
        updateDate: detailJob.updateDate || "",
        pjobTypeId: detailJob.pjobTypeId || "",
      });
    }
  }, [detailJob, pjobTypeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!form.code.trim()) newErrors.code = "This field is required";
    if (!form.description.trim())
      newErrors.description = "This field is required";
    if (!form.updateBy.trim()) newErrors.updateBy = "This field is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      ...form,
      updateDate: Date.now(),
      pjobTypeId: pjobTypeId || Math.random(),
    };

    if (pjobTypeId) {
      updateJob(payload);
    } else {
      addJob(payload);
    }
  };

  return (
    <div className="flex flex-col">
      <Breadcrumb />
      <div className="p-8 bg-white rounded-lg shadow border border-gray-200 w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {pjobTypeId ? "Update Job" : "Add Job"}
        </h2>

        <div className="space-y-4">
          {/* CODE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CODE <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="code"
              placeholder="Enter CODE (max 128 chars)"
              maxLength={128}
              className={`w-full p-2 border rounded focus:ring-2 focus:outline-none ${
                errors.code
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-600"
              }`}
              value={form.code}
              onChange={handleChange}
            />
            {errors.code && (
              <p className="text-red-500 text-xs mt-1">{errors.code}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="description"
              placeholder="Enter Description"
              className={`w-full p-2 border rounded focus:ring-2 focus:outline-none ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-600"
              }`}
              value={form.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Update By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Update By <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="updateBy"
              placeholder="Enter Update By"
              className={`w-full p-2 border rounded focus:ring-2 focus:outline-none ${
                errors.updateBy
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-600"
              }`}
              value={form.updateBy}
              onChange={handleChange}
            />
            {errors.updateBy && (
              <p className="text-red-500 text-xs mt-1">{errors.updateBy}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className={`px-5 py-2 rounded-md transition bg-gray-900 text-white hover:bg-blue-800`}
          >
            {pjobTypeId ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
