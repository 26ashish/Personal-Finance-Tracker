
db = db.getSiblingDB('finance-tracker');
db.createCollection('transactions');
db.transactions.insertMany([
  {
    type: "income",
    amount: 1000,
    category: "Salary",
    date: new Date(),
    description: "Initial dummy record 1"
  },
  {
    type: "expense",
    amount: 200,
    category: "Food",
    date: new Date(),
    description: "Initial dummy record 2"
  },
  {
    type: "expense",
    amount: 500,
    category: "Rent",
    date: new Date(),
    description: "Initial dummy record 4"
  },
  {
    type: "income",
    amount: 2000,
    category: "Salary",
    date: new Date(),
    description: "Initial dummy record 5"
  },
  {
    type: "expense",
    amount: 100,
    category: "Food",
    date: new Date(),
    description: "Initial dummy record 6"
  },
  {
    type: "income",
    amount: 300,
    category: "Salary",
    date: new Date(),
    description: "Initial dummy record 7"
  },
  {
    type: "expense",
    amount: 150,
    category: "Rent",
    date: new Date(),
    description: "Initial dummy record 8"
  },
  {
    type: "income",
    amount: 400,
    category: "Salary",
    date: new Date(),
    description: "Initial dummy record 9"
  },
  {
    type: "expense",
    amount: 250,
    category: "Food",
    date: new Date(),
    description: "Initial dummy record 10"
  }
]);
print("Database initialized with dummy data!");