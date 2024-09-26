import { useEffect, useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const ExpenseCharts = () => {
  const { expenses } = useExpense(); // Get expenses from context
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setFilteredExpenses(expenses); // Initialize with all expenses
  }, [expenses]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    filterExpenses(month, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterExpenses(selectedMonth, category);
  };

  const filterExpenses = (month, category) => {
    let filtered = expenses;

    if (month !== null) {
      filtered = filtered.filter(expense => new Date(expense.date).getMonth() === month);
    }
    if (category) {
      filtered = filtered.filter(expense => expense.category === category);
    }
    setFilteredExpenses(filtered);
  };

  // Prepare data for line chart
  const monthlyData = [];
  const categories = [...new Set(expenses.map(exp => exp.category))];
  
  for (let i = 0; i < 12; i++) {
    const monthExpenses = filteredExpenses.filter(exp => new Date(exp.date).getMonth() === i);
    const total = monthExpenses.reduce((acc, exp) => acc + exp.amount, 0);
    monthlyData.push({ month: i + 1, total });
  }

  // Prepare data for pie chart
  const categoryData = categories.map(category => {
    const total = filteredExpenses
      .filter(expense => expense.category === category)
      .reduce((acc, exp) => acc + exp.amount, 0);
    return { name: category, value: total };
  });

  return (
    <div className="container mt-5" style={{ background: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
      <h2 className="text-center mb-4" style={{ color: '#343a40' }}>Expense Visualization</h2>
      
      <div className="d-flex justify-content-center mb-4">
        <div className="me-3">
          <label className="form-label">Select Month:</label>
          <select onChange={(e) => handleMonthChange(Number(e.target.value))} className="form-select">
            <option value="">All Months</option>
            {[...Array(12)].map((_, index) => (
              <option key={index} value={index}>{index + 1}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label">Select Category:</label>
          <select onChange={(e) => handleCategoryChange(e.target.value)} className="form-select">
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="text-center">Monthly Expense Comparison</h4>
              <LineChart width={600} height={300} data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#007bff" />
              </LineChart>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
  <div className="card shadow-lg" style={{ borderRadius: '15px', backgroundColor: '#ffffff' }}>
    <div className="card-body">
      <h4 className="text-center mb-4" style={{ color: '#333', fontWeight: 'bold' }}>Expense Category Breakdown</h4>
      <div className="d-flex justify-content-center">
        <PieChart width={500} height={500}> 
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100} 
            fill="#007bff"
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default ExpenseCharts;
