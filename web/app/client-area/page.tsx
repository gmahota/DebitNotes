// app/client-area/page.tsx
import Summary from './Summary';
//import ExpensesList from './ExpensesList';
import ReportsDownload from './ReportsDownload';
import RealTimeExpenses from './RealTimeExpenses';

const ClientArea = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Área do Cliente</h1>
            <Summary />
            {/* <ExpensesList /> */}
            <RealTimeExpenses/>
            <ReportsDownload />
        </div>
    );
};

export default ClientArea;
