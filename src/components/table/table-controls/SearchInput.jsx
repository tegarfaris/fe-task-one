const SearchInput = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.currentTarget.value)}
    placeholder="Search..."
    className="border p-2 rounded-[10px] w-[320px] h-fit"
  />
);

export default SearchInput;
