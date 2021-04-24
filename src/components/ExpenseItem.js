import {MdEdit, MdDelete} from 'react-icons/md'

export default function ExpenseForm({ expense }) {
  const { id, charge, amount } = expense;

  return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">$ {amount}</span>
      </div>
      <div>
        <button className="edit-btn" aria-label='edit button'>
          <MdEdit/>
        </button>
        <button className="delete-btn" aria-label='delete button'>
          <MdDelete/>
        </button>
      </div>
    </li>
  );
}
