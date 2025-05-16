import { useState, useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function UserMenu({ username, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOutsideClick(ref, () => open && setOpen(false));

  return (
    <div className="admin-section" ref={ref}>
      <span className="admin-name" onClick={() => setOpen((v) => !v)}>
        {username || "پنل کاربری"}
      </span>

      {open && (
        <div className="user-dropdown">
          <button className="dropdown-item" onClick={onLogout}>
            خروج
          </button>
        </div>
      )}
    </div>
  );
}
