import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';
import ExpenseForm from './Components/ExpenseForm';
import { ExpenseProvider } from './Context/ExpenseContext';
import ExpenseCharts from './Components/ExpenseCharts ';


function App() {
  const notifySuccess = () => toast.success("Login Successful!");
  const notifyError = () => toast.error("Error occurred!");

  return (
    <>
      <ExpenseProvider>
        <Routes>
          <Route path="/" element={<Login notifySuccess={notifySuccess} notifyError={notifyError} />} />
          <Route path="/register" element={<Register notifySuccess={notifySuccess} notifyError={notifyError} />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/add-expense' element={<ExpenseForm />} />
          <Route path='/expensecharts' element={<ExpenseCharts />} />
        </Routes>
      </ExpenseProvider>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;