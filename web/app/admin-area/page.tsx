// app/admin-area/page.tsx
import ExpenseList from './ExpenseList';

const AdminArea = () => {
  return (
    <div className="container mx-auto p-6">
      <h1>Área Administrativa</h1>
      <ExpenseList />
    </div>
  );
};

export default AdminArea;
