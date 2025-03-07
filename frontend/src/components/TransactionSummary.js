const TransactionSummary = ({ summary, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded shadow animate-pulse"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-success-50 text-success-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Income</p>
            <p className="text-2xl font-semibold text-success-600">${summary?.totalIncome?.toFixed(2) || "0.00"}</p>
            <p className="text-xs text-gray-500">{summary?.count?.income || 0} transactions</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-danger-50 text-danger-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Expenses</p>
            <p className="text-2xl font-semibold text-danger-600">${summary?.totalExpense?.toFixed(2) || "0.00"}</p>
            <p className="text-xs text-gray-500">{summary?.count?.expense || 0} transactions</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-primary-50 text-primary-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Net Balance</p>
            <p
              className={`text-2xl font-semibold ${
                (summary?.netBalance || 0) >= 0 ? "text-success-600" : "text-danger-600"
              }`}
            >
              ${summary?.netBalance?.toFixed(2) || "0.00"}
            </p>
            <p className="text-xs text-gray-500">{summary?.count?.total || 0} transactions</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionSummary

