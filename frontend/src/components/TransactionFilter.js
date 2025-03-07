"use client"

import { useState } from "react"

const TransactionFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    from: "",
    to: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onFilterChange(filters)
  }

  const handleReset = () => {
    const resetFilters = {
      type: "",
      category: "",
      from: "",
      to: "",
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  const categories = [
    "Food",
    "Rent",
    "Salary",
  ]

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-medium mb-3">Filter Transactions</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <input
              type="date"
              name="from"
              value={filters.from}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <input
              type="date"
              name="to"
              value={filters.to}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  )
}

export default TransactionFilter

