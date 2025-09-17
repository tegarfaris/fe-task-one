import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  REQUEST_ADD_PRODUCT,
  REQUEST_GET_LIST_PRODUCT,
} from "../../features/products/actions";
import { useNavigate } from "react-router-dom";

const useProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.products);

  const getProductList = useCallback(() => {
    dispatch(REQUEST_GET_LIST_PRODUCT()).then((result) => {
      if (result.meta.requestStatus === "rejected") {
        console.error("Gagal boss:", result.error);
      }
    });
  }, [dispatch]);

  const addProduct = useCallback(
    (newProduct) => {
      dispatch(REQUEST_ADD_PRODUCT(newProduct)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          alert("berhasil ditambahkan");
          navigate("/product-list");
        } else if (result.meta.requestStatus === "rejected") {
          console.error("error nich: ", result.error);
        }
      });
    },
    [dispatch, navigate]
  );

  return {
    ...state,
    getProductList,
    addProduct,
  };
};

export default useProducts;
