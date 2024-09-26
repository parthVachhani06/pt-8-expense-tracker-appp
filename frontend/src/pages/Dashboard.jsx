// import ExpenseForm from '../Components/ExpenseForm'
import ExpenseCharts from '../Components/ExpenseCharts '
import ExpenseList from '../Components/ExpenseList'
import Navbar from '../Components/Navbar'
const Dashboard = () => {
  return (
    <div>
      <Navbar/>
      <ExpenseList/>
      <ExpenseCharts/>
    </div>
  )
}

export default Dashboard
