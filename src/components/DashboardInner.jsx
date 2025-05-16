import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext.jsx";
import { ProductContext } from "../contexts/ProductContext.jsx";
import ProductList from "./ProductList.jsx";
import { DeleteModal, AddEditModal } from "./Modals.jsx";
import SearchBar from "./dashboard/SearchBar.jsx";
import UserMenu from "./dashboard/UserMenu.jsx";
import Toolbar from "./dashboard/Toolbar.jsx";
import Pagination from "./dashboard/Pagination.jsx";

export default function DashboardInner() {
  const { user, handleLogout } = useAuth();

  const { fetchProducts, query, setQuery, page, setPage } =
    useContext(ProductContext);

  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [addEditVisible, setAddEditVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [page, query]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      await axios.delete(`http://localhost:3000/products/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch {
      alert("خطا در حذف محصول.");
    } finally {
      setDeleteId(null);
    }
  };

  const handleConfirm = async (data) => {
    const token = localStorage.getItem("token") || "";
    try {
      if (data.id) {
        await axios.put(`http://localhost:3000/products/${data.id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:3000/products", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchProducts();
    } catch {
      alert("خطا در ذخیره محصول.");
    } finally {
      setAddEditVisible(false);
      setEditData(null);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <SearchBar
          query={query}
          onSearch={(q) => {
            setQuery(q);
            setPage(1);
          }}
        />
        <UserMenu username={user?.username} onLogout={handleLogout} />
      </div>

      <div className="dashboard-title">
        <img className="management-logo" src="/setting.svg" alt="logo" />
        <h2 className="p-manage">مدیریت کالا</h2>
      </div>

      <Toolbar
        onAdd={() => {
          setEditData(null);
          setAddEditVisible(true);
        }}
      />

      <ProductList
        onEdit={(p) => {
          setEditData(p);
          setAddEditVisible(true);
        }}
        onDelete={setDeleteId}
      />

      <Pagination
        page={page}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
      />

      <AddEditModal
        isVisible={addEditVisible}
        initialData={editData}
        onConfirm={handleConfirm}
        onCancel={() => {
          setAddEditVisible(false);
          setEditData(null);
        }}
      />
      <DeleteModal
        isVisible={!!deleteId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
