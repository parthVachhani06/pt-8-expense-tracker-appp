import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const ExpenseContext = createContext();

// eslint-disable-next-line react/prop-types
export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]); // Initialize expenses as an empty array

  // Function to add a new expense
  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
    toast.success('Expense added successfully!');
  };

  // Function to get all expenses
  const getExpenses = () => {
    return expenses; // Return the current state of expenses
  };

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses, addExpense, getExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

// Custom hook to use the ExpenseContext
// eslint-disable-next-line react-refresh/only-export-components
export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};

export default ExpenseContext;
