import ExpenseItem from './ExpenseItem';
import { MdDelete } from 'react-icons/md';

export default function ExpenseList({ expenses }) {
  return (
    <>
      <ul className="list">
        {expenses &&
          expenses.map(expense => {
            return <ExpenseItem key={expense.id} expense={expense} />;
          })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn">
          clear expenses
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
}
