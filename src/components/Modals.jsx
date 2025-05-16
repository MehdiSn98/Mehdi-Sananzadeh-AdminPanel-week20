import { useState, useEffect } from "react";
import "../styles/Modals.css"

export function AddEditModal({ isVisible, initialData, onConfirm, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        quantity: initialData.quantity || "",
        price: initialData.price || "",
      });
    } else {
      setFormData({ name: "", quantity: "", price: "" });
    }
  }, [initialData, isVisible]);

  if (!isVisible) return null;

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const title = initialData ? "ویرایش محصول" : "ایجاد محصول جدید";
  const confirmText = initialData ? "ذخیره" : "ایجاد";

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="modal-text">{title}</h3>

        <div className="modal-input-group">
          <label>نام کالا</label>
          <input
            type="text"
            placeholder="نام کالا"
            value={formData.name}
            onChange={handleChange("name")}
          />
        </div>

        <div className="modal-input-group">
          <label>تعداد موجودی</label>
          <input
            type="number"
            placeholder="تعداد"
            value={formData.quantity}
            onChange={handleChange("quantity")}
          />
        </div>

        <div className="modal-input-group">
          <label>قیمت</label>
          <input
            type="number"
            placeholder="قیمت"
            value={formData.price}
            onChange={handleChange("price")}
          />
        </div>

        <div className="modal-actions">
          <button
            className="confirm-button"
            onClick={() =>
              onConfirm({
                ...formData,
                ...(initialData?.id ? { id: initialData.id } : {}),
              })
            }
          >
            {confirmText}
          </button>
          <button className="cancel-button" onClick={onCancel}>
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}

export function DeleteModal({ isVisible, onConfirm, onCancel }) {
  if (!isVisible) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <img src="/Close.png" alt="" />
        <h3 className="delete-modal-text">آیا از حذف این محصول مطمئن هستید؟</h3>
        <div className="modal-actions">
          <button className="confirm-button" onClick={onConfirm}>
            حذف
          </button>
          <button className="cancel-button" onClick={onCancel}>
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}
