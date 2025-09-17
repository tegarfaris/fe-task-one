const ColumnSorting = ({
  sortEnabled,
  setSortEnabled,
  sortConfig,
  toggleSortDirection,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <p>Sort Columns:</p>
      {Object.keys(sortEnabled).map((col) => (
        <div key={col} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={sortEnabled[col]}
            onChange={(e) =>
              setSortEnabled({ ...sortEnabled, [col]: e.target.checked })
            }
          />
          <label
            className="capitalize cursor-pointer"
            onClick={() => sortEnabled[col] && toggleSortDirection(col)}
          >
            {col}{" "}
            {sortEnabled[col] ? (sortConfig[col] === "asc" ? "🔼" : "🔽") : ""}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ColumnSorting;
