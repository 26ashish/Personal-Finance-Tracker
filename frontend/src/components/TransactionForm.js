"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"

const TransactionForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    date: format(new Date(), "yyyy-MM-dd"),
    description: "",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        type: initialData.type,
        amount: initialData.amount,
        category: initialData.category,
        date: format(new Date(initialData.date), "yyyy-MM-dd"),
        description: initialData.description || "",
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.type) {
      newErrors.type = "Type is required"
    }
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "Amount must be a positive number"
    }
    if (!formData.category) {
      newErrors.category = "Category is required"
    }
    if (!formData.date) {
      newErrors.date = "Date is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit({
        ...formData,
        amount: Number.parseFloat(formData.amount),
      })
    }
  }

  const categories = [
    "Food",
    "Rent",
    "Salary"
  ]

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-xl font-semibold mb-4">{initialData ? "Edit Transaction" : "New Transaction"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Transaction Type</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={formData.type === "income"}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600"
                />
                <span className="ml-2 text-gray-700">Income</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={formData.type === "expense"}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600"
                />
                <span className="ml-2 text-gray-700">Expense</span>
              </label>
            </div>
            {errors.type && <p className="text-danger-600 text-xs">{errors.type}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="0.00"
              required
            />
            {errors.amount && <p className="text-danger-600 text-xs">{errors.amount}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-danger-600 text-xs">{errors.category}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              required
            />
            {errors.date && <p className="text-danger-600 text-xs">{errors.date}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Optional description"
            ></textarea>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {initialData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TransactionForm

