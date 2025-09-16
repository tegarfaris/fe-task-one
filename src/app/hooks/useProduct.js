import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  REQUEST_ADD_PRODUCT,
  REQUEST_GET_LIST_PRODUCT,
} from "../../features/products/actions";
import { useNavigate } from "react-router-dom";

const useProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list, pending, success, isEmpty } = useSelector(
    (state) => state.products
  );

  const getProductList = useCallback(async () => {
    try {
      const res = await dispatch(REQUEST_GET_LIST_PRODUCT()).unwrap();
      console.log("berhasil bos");
      return res;
    } catch (error) {
      console.error("Gagal boss:", error);
      return null;
    }
  }, [dispatch]);

  const addProduct = useCallback(
    async (newProduct) => {
      try {
        await dispatch(REQUEST_ADD_PRODUCT(newProduct)).unwrap();
        alert("berhasil ditambahkan");
        navigate("/product-list");
      } catch (error) {
        console.error("error nich:", error);
      }
    },
    [dispatch, navigate]
  );

  return {
    list,
    pending,
    success,
    isEmpty,
    getProductList,
    addProduct,
  };
};

export default useProducts;
