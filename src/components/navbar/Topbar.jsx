import { useLocation } from "react-router-dom";

export default function Topbar() {
  const { pathname } = useLocation();

  const segments = pathname.split("/").filter(Boolean);
  const lastSegment =
    segments.length > 0 ? segments[segments.length - 1] : "dashboard";
  const pageName = lastSegment.replace(/-/g, " ");

  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-gray-800 capitalize">{pageName}</h1>
    </header>
  );
}
