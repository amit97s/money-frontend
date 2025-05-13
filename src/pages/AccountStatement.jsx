import { Calendar } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
const AccountStatement = () => {
  const location = useLocation();
  const { userId, userName } = location.state || {};
  const [transactions, setTransactions] = useState([]);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [openingBalance, setOpeningBalance] = useState(0);
  const [userCategory, setUserCategory] = useState('');
  useEffect(() => {
    if (userId) {
      fetchTransactions();
      fetchUserDetails();
    }
  }, [userId]);
  const fetchUserDetails = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const users = await response.json();
        const currentUser = users.find(user => user.name === userName);
        if (currentUser) {
          setOpeningBalance(Number(currentUser.amount));
          setUserCategory(currentUser.category);
        }
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  const calculateBalance = () => {
    if (userCategory === 'debtor') {
      return openingBalance + totalDebit - totalCredit;
    } else {
      return openingBalance + totalCredit - totalDebit;
    }
  };
  const fetchTransactions = async () => {
    try {
      const response = await fetch(`VITE_REACT_APP_BACKEND_URL/api/transactions`);
      if (response.ok) {
        const data = await response.json();
        const userTransactions = data.filter(t => 
          t.creditEntry.account === userName || t.debitEntry.account === userName
        );
        setTransactions(userTransactions);
        let creditTotal = 0;
        let debitTotal = 0;
        userTransactions.forEach(t => {
          if (t.creditEntry.account === userName) {
            creditTotal += Number(t.creditEntry.amount);
          }
          if (t.debitEntry.account === userName) {
            debitTotal += Number(t.debitEntry.amount);
          }
        });
        
        setTotalCredit(creditTotal);
        setTotalDebit(debitTotal);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="text-yellow-500">
          <Calendar className="h-6 w-6" />
        </span>
        Account Statement - {userName}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <h3 className="text-sm font-medium text-gray-500">Opening Balance</h3>
          <p className="text-xl font-bold">₹{openingBalance.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <h3 className="text-sm font-medium text-gray-500">Total Entries</h3>
          <p className="text-xl font-bold">{transactions.length}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm text-center">
          <h3 className="text-sm font-medium text-gray-500">Total Debit</h3>
          <p className="text-xl font-bold">₹{totalDebit.toFixed(2)}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm text-center">
          <h3 className="text-sm font-medium text-gray-500">Total Credit</h3>
          <p className="text-xl font-bold">₹{totalCredit.toFixed(2)}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm text-center">
          <h3 className="text-sm font-medium text-gray-500">Balance Amount</h3>
          <p className="text-xl font-bold">₹{calculateBalance().toFixed(2)}</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VN No</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expenses</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Narration</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => {
                    const isCredit = transaction.creditEntry.account === userName;
                    const entry = isCredit ? transaction.creditEntry : transaction.debitEntry;
                    const otherAccount = isCredit ? transaction.debitEntry.account : transaction.creditEntry.account;
                    return (
                      <tr key={transaction._id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{transaction.vnNo}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {isCredit ? 'Credit' : 'Debit'}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{otherAccount}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">₹{entry.amount}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">₹{entry.expenses || 0}</td>
                        <td className="px-3 py-2 text-sm text-gray-500 truncate max-w-xs">{entry.narration}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountStatement;