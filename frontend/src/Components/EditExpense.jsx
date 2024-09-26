import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { toast } from 'react-toastify';

const EditExpense = ({ expense, onClose }) => {
  const { setExpenses } = useExpense();
  const [amount, setAmount] = useState(expense.amount);
  const [description, setDescription] = useState(expense.description);
  const [date, setDate] = useState(expense.date);
  const [category, setCategory] = useState(expense.category);
  const [paymentMethod, setPaymentMethod] = useState(expense.paymentMethod);

  const handleUpdate = async () => {
    // Simulate API call for updating the expense
    try {
      // Assuming you have an API endpoint to update the expense
      const response = await fetch(`http://localhost:2000/api/expenses/${expense._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          description,
          date,
          category,
          paymentMethod,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update expense');
      }

      const updatedExpense = await response.json();
      setExpenses((prev) =>
        prev.map((exp) => (exp._id === updatedExpense._id ? updatedExpense : exp))
      );
      toast.success('Expense updated successfully!');
      onClose(); // Close the edit form
    } catch (error) {
      toast.error(error.message || 'Error updating expense');
      console.error('Error updating expense:', error);
    }
  };

  return (
    <div>
      <h3>Edit Expense</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <input
        type="text"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        placeholder="Payment Method"
      />
      <button onClick={handleUpdate}>Update Expense</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditExpense;
