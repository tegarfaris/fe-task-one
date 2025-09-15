import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProductsTable from "./app/page-modules/products/ProductsTable";
import Wizard from "./app/page-modules/products/add-product/Wizard";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/product-list" replace />} />
        <Route path="/product-list" element={<ProductsTable />} />
        <Route path="/product-list/add-product" element={<Wizard />} />
      </Routes>
    </Layout>
  );
}

export default App;
