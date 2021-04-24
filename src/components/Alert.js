export default function ExpenseForm({ type, text }) {
  return <div className={`alert alert-${type}`}>{text}</div>;
}
