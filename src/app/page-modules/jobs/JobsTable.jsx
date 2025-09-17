import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import { useCallback, useEffect, useState } from "react";
import useJobs from "../../hooks/useJobs";
import useDebounce from "../../hooks/function/useDebounce";
import { Ellipsis } from "lucide-react";
import SearchInput from "../../../components/table/table-controls/SearchInput";
import ColumnVisibility from "../../../components/table/table-controls/ColumnVisibility";
import ColumnSorting from "../../../components/table/table-controls/ColumnSorting";
import DataTable from "../../../components/table/DataTable";
import Pagination from "../../../components/table/table-controls/Pagination";

const JobsTable = () => {
  const navigate = useNavigate();
  const { getJobList, jobList, deleteJob, pending, refetch } = useJobs();
  const [filteredData, setFilteredData] = useState(jobList);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchKey, setSearchKey] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  // visibility
  const [filterColumn, setFilterColumn] = useState({
    code: true,
    description: true,
    updateBy: true,
  });

  // aktif/inaktif sorting
  const [sortEnabled, setSortEnabled] = useState({
    code: false,
    description: false,
    updateBy: false,
  });

  // arah sorting tiap kolom
  const [sortConfig, setSortConfig] = useState({
    code: "asc",
    description: "asc",
    updateBy: "asc",
  });

  const { debounce } = useDebounce({
    callback: (keyword) => {
      setSearchKey(keyword);
    },
    delay: 0,
  });

  useEffect(() => {
    getJobList();
  }, [getJobList, refetch]);

  // toggle arah sorting ASC/DESC
  const toggleSortDirection = (column) => {
    setSortConfig((prev) => ({
      ...prev,
      [column]: prev[column] === "asc" ? "desc" : "asc",
    }));
  };

  const multiSort = useCallback(
    (data, sortConfig) => {
      const sortColumns = Object.keys(sortConfig).filter(
        (col) => sortEnabled[col]
      );

      return [...data].sort((a, b) => {
        for (let col of sortColumns) {
          if (!filterColumn[col]) continue; // skip kalau hidden

          const order = sortConfig[col];
          const valA = a[col] ? a[col].toString().toLowerCase() : "";
          const valB = b[col] ? b[col].toString().toLowerCase() : "";
          const compare = valA.localeCompare(valB);

          if (compare !== 0) {
            return order === "asc" ? compare : -compare;
          }
        }
        return 0;
      });
    },
    [filterColumn, sortEnabled]
  );

  useEffect(() => {
    let results = jobList;

    // Search filter
    if (searchKey) {
      results = results.filter((item) =>
        Object.keys(item).some((params) =>
          item[params]
            .toString()
            .toLowerCase()
            .includes(searchKey.toLowerCase())
        )
      );
    }

    // Sorting
    results = multiSort(results, sortConfig);

    setFilteredData(results);
  }, [jobList, searchKey, sortConfig, filterColumn, sortEnabled, multiSort]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const reversedJobs = [...filteredData].reverse();

  const paginatedJobs = reversedJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      deleteJob(id);
      setCurrentPage("1");
    }
  };

  const columns = [
    {
      key: "no",
      title: "No",
      width: "5%",
      render: (_, idx) => {
        const no = (currentPage - 1) * itemsPerPage + idx + 1;
        return <p>{no}</p>;
      },
    },
    {
      key: "code",
      title: "CODE",
      isHidden: filterColumn.code ? "" : "hidden",
      render: (data) => <p>{data.code}</p>,
    },
    {
      key: "description",
      title: "Description",
      isHidden: filterColumn.description ? "" : "hidden",
      render: (data) => <p>{data.description}</p>,
    },
    {
      key: "updateBy",
      title: "Update By",
      isHidden: filterColumn.updateBy ? "" : "hidden",
      render: (data) => <p>{data.updateBy}</p>,
    },
    {
      key: "actions",
      title: "",
      width: "5%",
      render: (data) => (
        <div className="relative p-3">
          <button
            onClick={() => setOpenMenuId(openMenuId ? null : data.pjobTypeId)}
          >
            <Ellipsis />
          </button>

          {openMenuId === data.pjobTypeId && (
            <div className="absolute right-3 mt-2 bg-white border border-gray-200 rounded shadow-md z-10">
              <button
                onClick={() =>
                  navigate(`/job-list/edit-job/${data.pjobTypeId}`)
                }
                className="block px-4 py-2 text-left text-sm w-full hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(data.pjobTypeId)}
                className="block px-4 py-2 text-left text-sm w-full hover:bg-red-100 text-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      <Breadcrumb />
      <div className="flex flex-col p-8 bg-white rounded-lg shadow border border-gray-200 mt-3 gap-y-5">
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

        <div className="flex flex-col gap-4 mt-2">
          <SearchInput value={searchKey} onChange={debounce} />
          <div className="flex gap-20">
            <ColumnVisibility
              filterColumn={filterColumn}
              setFilterColumn={setFilterColumn}
            />
            <ColumnSorting
              sortEnabled={sortEnabled}
              setSortEnabled={setSortEnabled}
              sortConfig={sortConfig}
              toggleSortDirection={toggleSortDirection}
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          datas={paginatedJobs}
          loadingState={pending}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          onNext={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        />
      </div>
    </div>
  );
};

export default JobsTable;
