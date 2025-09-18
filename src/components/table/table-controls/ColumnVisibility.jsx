import { ListChecks } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const ColumnVisibility = ({ filterColumn, setFilterColumn }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = (col, checked) => {
    if (!checked && Object.values(filterColumn).filter(Boolean).length === 1) {
      return;
    }
    setFilterColumn({ ...filterColumn, [col]: checked });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-4 py-2 border rounded rounded-[5px] bg-gray-900 hover:bg-gray-600 text-white"
      >
        <div className="flex gap-2 justify-center items-center">
          <ListChecks size={20} />
          <p>Visibility Columns</p>
        </div>
      </button>

      {open && (
        <div className="absolute mt-2 left-0 bg-white border border-gray-200 rounded shadow-md z-20 w-48">
          <p className="px-4 py-2 text-sm text-gray-600 border-b">Visibility</p>
          <div className="p-2 flex flex-col gap-2">
            {Object.keys(filterColumn).map((col) => (
              <label key={col} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filterColumn[col]}
                  onChange={(e) => handleToggle(col, e.target.checked)}
                />
                <span className="capitalize">{col}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnVisibility;
