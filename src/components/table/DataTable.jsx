import React from "react";
import { Link } from "react-router-dom";

const DataTable = ({ datas, columns, loadingState, linkTo }) => {
  const noRecordData = () => (
    <tbody>
      <tr>
        <td colSpan={columns.length} className="h-48 text-center text-gray-500">
          No records
        </td>
      </tr>
    </tbody>
  );

  return (
    <table className="min-w-full border-collapse h-full">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className={`${column.isHidden} px-4 py-3 text-left text-sm font-semibold text-gray-700`}
              style={{
                width: column.width || "auto",
              }}
            >
              <div className="flex items-center gap-2">
                <span>{column.title}</span>
                {column.renderHeaderProperty}
              </div>
            </th>
          ))}
        </tr>
      </thead>

      {datas?.length === 0 && !loadingState ? (
        noRecordData()
      ) : (
        <tbody>
          {loadingState ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-10 text-gray-500"
              >
                Loading...
              </td>
            </tr>
          ) : (
            datas.map((data, i) => (
              <tr key={i} className="hover:bg-gray-50 border-b transition">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-4 py-2 text-sm ${
                      column.capitalize ? "capitalize" : ""
                    } ${column.isHidden}`}
                    style={{ width: column.width || "auto" }}
                  >
                    {linkTo ? (
                      <Link to={`${linkTo}/${data.id}`}>
                        {column.render
                          ? column.render(data, i)
                          : data[column.key]}
                      </Link>
                    ) : column.render ? (
                      column.render(data, i)
                    ) : (
                      data[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      )}
    </table>
  );
};

export default DataTable;
