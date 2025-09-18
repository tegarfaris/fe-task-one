import { Search } from "lucide-react";

const SearchInput = ({ value, onChange }) => (
  <div className="relative">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder="Search..."
      className="border p-2 pr-10 rounded-[10px] w-[320px] h-fit"
    />
    <Search className="absolute right-2 top-2" />
  </div>
);

export default SearchInput;
