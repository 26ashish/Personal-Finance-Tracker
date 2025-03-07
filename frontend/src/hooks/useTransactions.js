"use client"

import { useState } from "react"
import api from "../services/api"

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
    count: {
      income: 0,
      expense: 0,
      total: 0,
    },
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTransactions = async (filters = {}) => {
    try {
      setLoading(true)
      setError(null)

      const queryParams = new URLSearchParams()
      if (filters.type) queryParams.append("type", filters.type)
      if (filters.category) queryParams.append("category", filters.category)
      if (filters.from) queryParams.append("from", filters.from)
      if (filters.to) queryParams.append("to", filters.to)

      const response = await api.get(`/transactions?${queryParams.toString()}`)
      setTransactions(response.data)
    } catch (err) {
      setError(err)
      console.error("Error fetching transactions:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchSummary = async (filters = {}) => {
    try {
      setLoading(true)
      setError(null)

      const queryParams = new URLSearchParams()
      if (filters.from) queryParams.append("from", filters.from)
      if (filters.to) queryParams.append("to", filters.to)

      const response = await api.get(`/transactions/summary?${queryParams.toString()}`)
      setSummary(response.data)
    } catch (err) {
      setError(err)
      console.error("Error fetching summary:", err)
    } finally {
      setLoading(false)
    }
  }

  const createTransaction = async (data) => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.post("/transactions", data)
      return response.data
    } catch (err) {
      setError(err)
      console.error("Error creating transaction:", err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateTransaction = async (id, data) => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.put(`/transactions/${id}`, data)
      return response.data
    } catch (err) {
      setError(err)
      console.error("Error updating transaction:", err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteTransaction = async (id) => {
    try {
      setLoading(true)
      setError(null)
      await api.delete(`/transactions/${id}`)
    } catch (err) {
      setError(err)
      console.error("Error deleting transaction:", err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    transactions,
    summary,
    loading,
    error,
    fetchTransactions,
    fetchSummary,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  }
}

