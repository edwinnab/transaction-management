import { Routes, Route } from 'react-router-dom';
import TransactionForm from './components/TransactionForm';
import NavBar from './components/Navbar';
import { useState, useEffect } from 'react';
import TransactionList from './components/TransactionList';

function App() {
  const [data, setData] = useState([])

  const fetchTransactions = () => {
    fetch('https://infra.devskills.app/api/accounting/transactions')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data)) {
          setData(data);
        } else {
          console.error('Invalid data format received:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  }
  

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<TransactionForm />}/>
        <Route  path="/add-transaction" element={<TransactionForm data={data} setdata={setData}/>}/>
        <Route  path="/transaction-history" element={<TransactionList  data={data}/>}/>
      </Routes>

    </>
  );
}

export default App;
