import { MdSend } from 'react-icons/md';

export default function ExpenseForm({
  charge,
  amount,
  handleAmount,
  handleCharge,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="e.g. rent"
            value={charge}
            onChange={handleCharge}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="e.g. 200"
            value={amount}
            onChange={handleAmount}
            required
          />
        </div>
      </div>
      <button type="submit" className="btn">
        submit
        <MdSend classname="btn-icon" />
      </button>
    </form>
  );
}
