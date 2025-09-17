const ColumnVisibility = ({ filterColumn, setFilterColumn }) => {
  const handleToggle = (col, checked) => {
    if (!checked && Object.values(filterColumn).filter(Boolean).length === 1) {
      return; // tidak boleh kosong semua
    }
    setFilterColumn({ ...filterColumn, [col]: checked });
  };

  return (
    <div className="flex flex-col gap-4">
      <p>Visibility Column:</p>
      {Object.keys(filterColumn).map((col) => (
        <div key={col} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filterColumn[col]}
            onChange={(e) => handleToggle(col, e.target.checked)}
          />
          <label className="capitalize">{col}</label>
        </div>
      ))}
    </div>
  );
};

export default ColumnVisibility;
