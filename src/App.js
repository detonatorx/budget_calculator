import './App.css';
import Alert from './components/Alert';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

const initialExpenses = [
  {
    id: uuidv4(),
    charge: 'rent',
    amount: 500,
  },
  {
    id: uuidv4(),
    charge: 'car payment',
    amount: 400,
  },
  {
    id: uuidv4(),
    charge: 'credit card bill',
    amount: 100,
  },
];

function App() {
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);

  // single expense
  const [charge, setCharge] = useState('');

  // single amount
  const [amount, setAmount] = useState('');

  // alert
  const [alert, setAlert] = useState({ show: false });

  // event performers
  const handleCharge = event => {
    setCharge(event.target.value);
  };

  const handleAmount = event => {
    setAmount(event.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 5000);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (charge !== '' && amount > 0) {
      const singleExpense = {
        id: uuidv4(),
        charge,
        amount,
      };
      setExpenses([...expenses, singleExpense]);
      setCharge('');
      setAmount('');
      handleAlert({ type: 'success', text: 'item added' });
    } else {
      handleAlert({
        type: 'danger',
        text:
          "charge can't be empty value and amount value has to be bigger than zero",
      });
    }
  };

  //clear all items
  const clearItems = () => {
    setExpenses([]);
  };

  // handle delete
  const handleDelete = id => {
    let item = expenses.filter(item => item.id == id);
    let remainingExpenses = expenses.filter(item => item.id !== id);
    setExpenses(remainingExpenses);
    handleAlert({ type: 'danger', text: `item "${item[0].charge}" deleted` });
  };

  // handle edit
  const handleEdit = id => {};

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending:{' '}
        <span className="total">
          ${' '}
          {expenses.reduce((acc, curr) => {
            return acc + parseInt(curr.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
