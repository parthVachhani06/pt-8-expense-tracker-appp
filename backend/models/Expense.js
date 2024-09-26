const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  paymentMethod: { type: String, required: true },
});

module.exports = mongoose.model('Expense', ExpenseSchema);
