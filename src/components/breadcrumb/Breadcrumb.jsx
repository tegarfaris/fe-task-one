import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const { pathname } = useLocation();

  // pecah pathname jadi array, buang string kosong
  const segments = pathname.split("/").filter(Boolean);

  // build breadcrumb items
  const crumbs = segments.map((seg, idx) => {
    // path sementara sampai segment ke-index ini
    const path = "/" + segments.slice(0, idx + 1).join("/");

    return {
      label: seg.replace(/-/g, " "), // rapikan -> ganti - jadi spasi
      path,
    };
  });

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ol className="flex gap-2 items-center">
        <li>
          <Link to="/" className="hover:underline text-blue-600">
            Home
          </Link>
        </li>
        {crumbs.map((c, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span>/</span>
            {idx === crumbs.length - 1 ? (
              <span className="font-semibold text-gray-800 capitalize">
                {c.label}
              </span>
            ) : (
              <Link
                to={c.path}
                className="hover:underline text-blue-600 capitalize"
              >
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
