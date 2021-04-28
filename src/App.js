import './App.css';
import Alert from './components/Alert';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';

// const initialExpenses = [
//   {
//     id: uuidv4(),
//     charge: 'rent',
//     amount: 500,
//   },
//   {
//     id: uuidv4(),
//     charge: 'car payment',
//     amount: 400,
//   },
//   {
//     id: uuidv4(),
//     charge: 'credit card bill',
//     amount: 100,
//   },
// ];

const initialExpenses = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : [];

function App() {
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);

  // single expense
  const [charge, setCharge] = useState('');

  // single amount
  const [amount, setAmount] = useState('');

  // alert
  const [alert, setAlert] = useState({ show: false });

  //edit
  const [edit, setEdit] = useState(false);

  // edit item
  const [id, setId] = useState(0);

  //useEffect
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

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
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: 'success', text: 'item edited' });
      } else {
        const singleExpense = {
          id: uuidv4(),
          charge,
          amount,
        };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: 'success', text: 'item added' });
      }
      setCharge('');
      setAmount('');
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
    let item = expenses.filter(item => item.id === id);
    let remainingExpenses = expenses.filter(item => item.id !== id);
    setExpenses(remainingExpenses);
    handleAlert({
      type: 'danger',
      text: `item "${item[0].charge}" deleted`,
    });
  };

  // handle edit
  const handleEdit = id => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <div className="root-container">
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
          edit={edit}
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
      <div id="detonatorx">detonatorx ©, 2021</div>
    </div>
  );
}

export default App;
