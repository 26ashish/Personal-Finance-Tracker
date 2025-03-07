const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Get all transactions with optional filtering
router.get('/', transactionController.getAllTransactions);

// Get transaction summary
router.get('/summary', transactionController.getTransactionSummary);

// Get a single transaction by ID
router.get('/:id', transactionController.getTransactionById);

// Create a new transaction
router.post('/', transactionController.createTransaction);

// Update an existing transaction
router.put('/:id', transactionController.updateTransaction);

// Delete a transaction
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;

