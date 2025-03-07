"use client"

import { useState, useEffect } from "react"
import TransactionList from "./TransactionList"
import TransactionForm from "./TransactionForm"
import TransactionSummary from "./TransactionSummary"
import TransactionFilter from "./TransactionFilter"
import { useTransactions } from "../hooks/useTransactions"

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false)
  const [editTransaction, setEditTransaction] = useState(null)
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    from: "",
    to: "",
  })

  const {
    transactions,
    summary,
    loading,
    error,
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    fetchSummary,
  } = useTransactions()

  useEffect(() => {
    fetchTransactions(filters)
    fetchSummary(filters)
  }, [filters])

  const handleCreateTransaction = async (data) => {
    await createTransaction(data)
    setShowForm(false)
    fetchTransactions(filters)
    fetchSummary(filters)
  }

  const handleUpdateTransaction = async (data) => {
    await updateTransaction(editTransaction._id, data)
    setEditTransaction(null)
    setShowForm(false)
    fetchTransactions(filters)
    fetchSummary(filters)
  }

  const handleDeleteTransaction = async (id) => {
    await deleteTransaction(id)
    fetchTransactions(filters)
    fetchSummary(filters)
  }

  const handleEditTransaction = (transaction) => {
    setEditTransaction(transaction)
    setShowForm(true)
  }

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Personal Finance Dashboard</h1>
        <button
          onClick={() => {
            setEditTransaction(null)
            setShowForm(!showForm)
          }}
          className="px-4 py-2 bg-primary-600 text-white rounded shadow hover:bg-primary-700 transition"
        >
          {showForm ? "Cancel" : "Add Transaction"}
        </button>
      </div>

      {showForm && (
        <TransactionForm
          initialData={editTransaction}
          onSubmit={editTransaction ? handleUpdateTransaction : handleCreateTransaction}
          onCancel={() => {
            setShowForm(false)
            setEditTransaction(null)
          }}
        />
      )}

      <TransactionSummary summary={summary} loading={loading} />

      <TransactionFilter onFilterChange={handleFilterChange} />

      {error && <div className="p-4 bg-danger-100 text-danger-700 rounded">Error: {error.message}</div>}

      <TransactionList
        transactions={transactions}
        loading={loading}
        onEdit={handleEditTransaction}
        onDelete={handleDeleteTransaction}
      />
    </div>
  )
}

export default Dashboard

