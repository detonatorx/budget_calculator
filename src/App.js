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

  // event performers
  const handleCharge = event => {
    setCharge(event.target.value);
  };

  const handleAmount = event => {
    setAmount(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (charge !== '' && amount > 0) {
      const singleExpense = {
        id: uuidv4(),
        charge,
        amount,
      };
      setExpenses([...expenses, singleExpense])
      setCharge('')
      setAmount('')
    } else {
      // handle alert called
    }
  };

  return (
    <>
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
        <ExpenseList expenses={expenses} />
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
