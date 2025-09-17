type PaginationProps = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
  disabled?: boolean;
};

export function PaginationBtn({
  page,
  totalPages,
  onPrev,
  onNext,
  className = "",
  disabled = false,
}: PaginationProps) {
  return (
    <div className={`flex flex-col items-center my-4 ${className}`}>
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Page <span className="font-semibold text-gray-900">{page}</span> of{" "}
        <span className="font-semibold text-gray-900">{totalPages}</span>
      </span>

      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={onPrev}
          aria-label="Go to previous page"
          disabled={page <= 1 || disabled}
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        <button
          onClick={onNext}
          aria-label="Go to next page"
          disabled={page >= totalPages || disabled}
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
