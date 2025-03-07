"use client"
import { format } from "date-fns"

const TransactionList = ({ transactions, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
        <p className="mt-2 text-gray-600">Loading transactions...</p>
      </div>
    )
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded shadow">
        <p className="text-gray-500">No transactions found.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction, index) => (
            <tr key={transaction._id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    transaction.type === "income" ? "bg-success-100 text-success-700" : "bg-danger-100 text-danger-700"
                  }`}
                >
                  {transaction.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`font-medium ${transaction.type === "income" ? "text-success-600" : "text-danger-600"}`}
                >
                  ${transaction.amount.toFixed(2)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-800">{transaction.category}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                {format(new Date(transaction.date), "MMM dd, yyyy")}
              </td>
              <td className="px-6 py-4 text-gray-600">{transaction.description || "—"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => onEdit(transaction)} className="text-primary-600 hover:text-primary-800 mr-4">
                  Edit
                </button>
                <button onClick={() => onDelete(transaction._id)} className="text-danger-600 hover:text-danger-800">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionList

