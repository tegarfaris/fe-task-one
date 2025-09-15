import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";

const ProductsTable = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.list);

  return (
    <div className="flex flex-col">
      <Breadcrumb />
      <div className="p-8 bg-white rounded-lg shadow border border-gray-200 mt-3">
        <div className="flex w-full gap-2 items-center">
          <h2 className="w-full text-2xl font-semibold text-gray-800">
            Product List
          </h2>

          <button
            onClick={() => navigate("/product-list/add-product")}
            className="bg-gray-900 text-white rounded-[5px] w-[200px] h-[50px] place-self-end"
          >
            Add Product
          </button>
        </div>

        <div className="overflow-x-auto pt-5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-3 text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="p-3 text-sm font-semibold text-gray-700">
                  Price
                </th>
                <th className="p-3 text-sm font-semibold text-gray-700">
                  Document
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-4 text-gray-500 text-center">
                    No products available.
                  </td>
                </tr>
              ) : (
                products.map((p, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="p-3 text-gray-800">{p.name}</td>
                    <td className="p-3 text-gray-800">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(p.price)}
                    </td>

                    <td className="p-3 text-gray-600">{p.attachment || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
