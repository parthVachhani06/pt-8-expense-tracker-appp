import { useEffect, useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { toast } from 'react-toastify';
import EditExpense from './EditExpense'; // Ensure this path is correct

const ExpenseList = () => {
  const { expenses, setExpenses } = useExpense(); 
  const [isEditing, setIsEditing] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('http://localhost:2000/api/expenses');
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        toast.error(error.message || 'Network error, please try again later.');
      }
    };

    fetchExpenses();
  }, [setExpenses]);

  const handleDelete = async (id) => {
    // Confirm delete action
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        const response = await fetch(`http://localhost:2000/api/expenses/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete expense');
        }

        // Update state to remove deleted expense
        setExpenses((prev) => prev.filter(expense => expense._id !== id));
        toast.success('Expense deleted successfully!');
      } catch (error) {
        toast.error(error.message || 'Error deleting expense');
        console.error('Error deleting expense:', error);
      }
    }
  };

  const handleEditClick = (expense) => {
    setSelectedExpense(expense);
    setIsEditing(true); // Open the edit modal
  };

  const handleCloseEdit = () => {
    setIsEditing(false); // Close the edit modal
    setSelectedExpense(null); // Clear the selected expense
  };

  return (
    <div className="container mt-5">
      <h2>Expense List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Category</th>
            <th>Payment Method</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses && expenses.length > 0 ? (
            expenses.map((expense, index) => (
              <tr key={expense._id}>
                <td>{index + 1}</td>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.category}</td>
                <td>{expense.paymentMethod}</td>
                <td>
                  <button onClick={() => handleEditClick(expense)} className="btn btn-warning">Edit</button>
                  <button onClick={() => handleDelete(expense._id)} className="btn btn-danger ml-2">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No expenses found</td>
            </tr>
          )}
        </tbody>
      </table>

      {isEditing && selectedExpense && (
        <EditExpense expense={selectedExpense} onClose={handleCloseEdit} />
      )}
    </div>
  );
};

export default ExpenseList;
