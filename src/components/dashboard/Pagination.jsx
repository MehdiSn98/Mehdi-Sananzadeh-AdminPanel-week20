export default function Pagination({ page, onPrev, onNext }) {
  return (
    <div className="pagination">
      <button
        className="pagination-button"
        disabled={page === 1}
        onClick={onPrev}
      >
        قبلی
      </button>
      <span className="pagination-info">صفحه {page}</span>
      <button className="pagination-button" onClick={onNext}>
        بعدی
      </button>
    </div>
  );
}
