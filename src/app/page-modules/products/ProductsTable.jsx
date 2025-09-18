import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatCurrency";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import useProducts from "../../hooks/useProduct";
import { useEffect, useState } from "react";
import DataTable from "../../../components/table/DataTable";
import Pagination from "../../../components/table/table-controls/Pagination";

const ProductsTable = () => {
  const navigate = useNavigate();
  const { getProductList, list: products, pending } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const reversedProducts = [...products].reverse();

  const paginatedProducts = reversedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      key: "name",
      title: "Name",
      render: (data) => {
        return <p>{data.name}</p>;
      },
    },
    {
      key: "price",
      title: "Price",
      render: (data) => {
        return <p>{formatCurrency(data.price)}</p>;
      },
    },
    {
      key: "document",
      title: "Document",
      render: (data) => {
        return <p>{data.document}</p>;
      },
    },
  ];

  return (
    <div className="flex flex-col">
      <Breadcrumb />
      <div className="flex flex-col p-8 bg-white rounded-lg shadow border border-gray-200 mt-3 gap-y-5">
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

        <DataTable
          columns={columns}
          datas={paginatedProducts}
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

export default ProductsTable;
