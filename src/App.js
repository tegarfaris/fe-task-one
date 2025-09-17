import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProductsTable from "./app/page-modules/products/ProductsTable";
import Wizard from "./app/page-modules/products/add-product/Wizard";
import JobsTable from "./app/page-modules/jobs/JobsTable";
import AddJobForm from "./app/page-modules/jobs/add-job/AddJobForm";

function App() {
  useEffect(() => {
    document.title = "Dashboard Product";
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/product-list" replace />} />
        <Route path="/product-list" element={<ProductsTable />} />
        <Route path="/product-list/add-product" element={<Wizard />} />

        {/* job list */}
        <Route path="/job-list" element={<JobsTable />} />
        <Route path="/job-list/add-job" element={<AddJobForm />} />
        <Route path="/job-list/edit-job/:pjobTypeId" element={<AddJobForm />} />
      </Routes>
    </Layout>
  );
}

export default App;
