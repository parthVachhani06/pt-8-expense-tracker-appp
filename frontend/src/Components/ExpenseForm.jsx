import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useExpense } from '../context/ExpenseContext'; 

const ExpenseForm = () => {
  const { addExpense } = useExpense();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [image, setImage] = useState(null); // Optional: if you want to add an image

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (!amount || !description || !date || !category || !paymentMethod) {
      return toast.error('All fields are required');
    }

    const newExpense = {
      amount,
      description,
      date,
      category,
      paymentMethod,
      image, // Optional image if needed
    };

    try {
      const url = "http://localhost:2000/api/expenses"; // Your API endpoint
      const formData = new FormData();
      formData.append('amount', amount);
      formData.append('description', description);
      formData.append('date', date);
      formData.append('category', category);
      formData.append('paymentMethod', paymentMethod);
      if (image) {
        formData.append('image', image);
      }

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error adding expense');
      }

      addExpense(newExpense); 
      setAmount('');
      setDescription('');
      setDate('');
      setCategory('');
      setPaymentMethod('');
      setImage(null);
      toast.success('Expense added successfully!');
      navigate('/dashboard'); 
    } catch (error) {
      toast.error(error.message || 'Network error, please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Payment Method</label>
          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="cash">Cash</option>
            <option value="credit">Credit</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Image (optional)</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
