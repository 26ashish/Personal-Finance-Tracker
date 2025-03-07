const Transaction = require('../models/Transaction');

// Get all transactions with optional filtering
exports.getAllTransactions = async (req, res) => {
  try {
    const { type, from, to, category } = req.query;
    const filter = {};

    // Apply filters if provided
    if (type) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    if (from || to) {
      filter.date = {};
      if (from) {
        filter.date.$gte = new Date(from);
      }
      if (to) {
        filter.date.$lte = new Date(to);
      }
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { type, amount, category, date, description } = req.body;

    // Validate required fields
    if (!type || !amount || !category) {
      return res.status(400).json({ message: 'Type, amount, and category are required' });
    }

    // Validate amount is non-negative
    if (amount < 0) {
      return res.status(400).json({ message: 'Amount must be non-negative' });
    }

    // Validate type is either income or expense
    if (type !== 'income' && type !== 'expense') {
      return res.status(400).json({ message: 'Type must be either income or expense' });
    }

    // Create new transaction
    const transaction = new Transaction({
      type,
      amount,
      category,
      date: date || new Date(),
      description: description || ''
    });

    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing transaction
exports.updateTransaction = async (req, res) => {
  try {
    const { type, amount, category, date, description } = req.body;

    // Validate amount is non-negative if provided
    if (amount !== undefined && amount < 0) {
      return res.status(400).json({ message: 'Amount must be non-negative' });
    }

    // Validate type is either income or expense if provided
    if (type && type !== 'income' && type !== 'expense') {
      return res.status(400).json({ message: 'Type must be either income or expense' });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { type, amount, category, date, description },
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transaction summary
exports.getTransactionSummary = async (req, res) => {
  try {
    const { from, to } = req.query;
    const filter = {};

    // Apply date filter if provided
    if (from || to) {
      filter.date = {};
      if (from) {
        filter.date.$gte = new Date(from);
      }
      if (to) {
        filter.date.$lte = new Date(to);
      }
    }

    // Get all transactions based on filter
    const transactions = await Transaction.find(filter);

    // Calculate summary
    const summary = {
      totalIncome: 0,
      totalExpense: 0,
      netBalance: 0
    };

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        summary.totalIncome += transaction.amount;
      } else {
        summary.totalExpense += transaction.amount;
      }
    });

    summary.netBalance = summary.totalIncome - summary.totalExpense;

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

