import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import useJobs from "../../hooks/useJobs";
import useDebounce from "../../hooks/function/useDebounce";

const JobsTable = () => {
  const navigate = useNavigate();
  const { getJobList, jobList, pending } = useJobs();
  const [filteredData, setFilteredData] = useState(jobList);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchKey, setSearchKey] = useState("");
  const [filterColumn, setFilterColumn] = useState({
    code: true,
    description: true,
    updateBy: true,
  });
  const { debounce } = useDebounce({
    callback: (keyword) => {
      setSearchKey(keyword);
    },
    delay: 0,
  });

  useEffect(() => {
    getJobList();
  }, [getJobList]);

  useEffect(() => {
    if (!searchKey) {
      setFilteredData(jobList);
      return;
    }
    const results = jobList.filter((item) =>
      Object.keys(item).some((params) =>
        item[params].toString().toLowerCase().includes(searchKey.toLowerCase())
      )
    );
    setFilteredData(results);
  }, [jobList, searchKey]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const reversedJobs = [...filteredData].reverse();

  const paginatedProducts = reversedJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  return (
    <div className="flex flex-col">
      <Breadcrumb />
      <div className="p-8 bg-white rounded-lg shadow border border-gray-200 mt-3">
        <div className="flex w-full gap-2 items-center">
          <h2 className="w-full text-2xl font-semibold text-gray-800">
            Job List
          </h2>

          <button
            onClick={() => navigate("/job-list/add-job")}
            className="bg-gray-900 text-white rounded-[5px] w-[200px] h-[50px] place-self-end"
          >
            Add Job
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={searchKey}
            onChange={(e) => debounce(e.currentTarget.value)}
            placeholder="Search by code, description or updateBy"
            className="border p-2 rounded-[10px] w-[320px]"
          />

          <div className="flex gap-2">
            <p>Visibility Column: </p>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="code"
                id="code"
                checked={filterColumn.code}
                onChange={(e) =>
                  setFilterColumn({ ...filterColumn, code: e.target.checked })
                }
              />
              <label>Code</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="description"
                id="description"
                checked={filterColumn.description}
                onChange={(e) =>
                  setFilterColumn({
                    ...filterColumn,
                    description: e.target.checked,
                  })
                }
              />
              <label>Description</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="updateBy"
                id="updateBy"
                checked={filterColumn.updateBy}
                onChange={(e) =>
                  setFilterColumn({
                    ...filterColumn,
                    updateBy: e.target.checked,
                  })
                }
              />
              <label>Update By</label>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto pt-5">
          {pending ? (
            <div className="w-full py-10 text-center text-gray-500">
              Loading Job...
            </div>
          ) : (
            <>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-3 text-sm font-semibold text-gray-700">
                      No
                    </th>
                    <th
                      className={`${
                        filterColumn.code ? "" : "hidden"
                      } p-3 text-sm font-semibold text-gray-700`}
                    >
                      CODE
                    </th>
                    <th
                      className={`${
                        filterColumn.description ? "" : "hidden"
                      } p-3 text-sm font-semibold text-gray-700`}
                    >
                      Description
                    </th>
                    <th
                      className={`${
                        filterColumn.updateBy ? "" : "hidden"
                      } p-3 text-sm font-semibold text-gray-700`}
                    >
                      Update by
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-4 text-gray-500 text-center">
                        No Jobs available.
                      </td>
                    </tr>
                  ) : (
                    paginatedProducts.map((p, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="w-[5%] p-3 text-gray-800">
                          {" "}
                          {(currentPage - 1) * itemsPerPage + idx + 1}
                        </td>
                        <td
                          className={`${
                            filterColumn.code ? "" : "hidden"
                          } w-[20%] p-3 text-gray-800 uppercase`}
                        >
                          {p.code}
                        </td>
                        <td
                          className={`${
                            filterColumn.description ? "" : "hidden"
                          } w-[45%] p-3 text-gray-800 capitalize`}
                        >
                          {p.description}
                        </td>
                        <td
                          className={`${
                            filterColumn.updateBy ? "" : "hidden"
                          } w-[40%] p-3 text-gray-600 uppercase`}
                        >
                          {p.updateBy || "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-end items-center gap-4 mt-6">
                  <button
                    onClick={handlePrev}
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
                    onClick={handleNext}
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
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsTable;
