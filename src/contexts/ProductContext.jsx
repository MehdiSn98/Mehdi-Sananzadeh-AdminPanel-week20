import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || "";
      const res = await api.get("http://localhost:3000/products", {
        params: { page, limit, name: query },
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.data || res.data);
    } catch (err) {
      console.error("fetchProducts:", err);
      alert("خطا در دریافت محصولات.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, query]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        query,
        setQuery,
        page,
        setPage,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
