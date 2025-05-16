export default function Toolbar({ onAdd }) {
  return (
    <div className="dashboard-toolbar">
      <button className="dashboard-button add-button" onClick={onAdd}>
        افزودن محصول
      </button>
    </div>
  );
}
