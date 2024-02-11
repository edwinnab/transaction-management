import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import TransactionList from "./TransactionList"


function TransactionForm ({setdata, data}) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
       "account_id": uuidv4(), // Generate UUID v4 for account_id
       "amount": 0,
    })

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const newValue = e.target.id === 'amount' && value.trim() !== '' && !isNaN(parseFloat(value)) ? parseFloat(value) : value;
        setFormData({
            ...formData,
            [e.target.id]: newValue
        });
    }

    //fields should be cleared after the form is submitted.
    const resetForm = () => {
        setFormData({
            "account_id": uuidv4(), // Generate new UUID v4 when resetting form
            "amount": 0,
        })
    }

    const handleTransactionSubmit = (e) => {
        e.preventDefault()
        fetch('https://infra.devskills.app/api/accounting/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(newTransaction => {
            //newly submitted transaction should go on the top of the list 
            setdata([newTransaction, ...data])
            resetForm()
        })
        .catch(error => console.log(error))
        .finally(navigate('/transaction-history'))
    }
    return (
        <>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Submit new transaction
        </h2>
        <form className="max-w-sm mx-auto mt-8" onSubmit={handleTransactionSubmit}>
        <div className="mb-5">
            <label htmlFor="account_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account ID:</label>
            <input 
            data-type="account-id" 
            type="text" 
            id="account_id"
            value={formData.account_id} 
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
            <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount:</label>
            <input 
            data-type="amount"
            type="number"
            id="amount" 
            value={formData.amount}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <input 
        data-type="transaction-submit"
        type="submit" 
        id="dropdownDefaultButton" 
        data-dropdown-toggle="dropdown" 
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        />
        </form>
        <TransactionList data={data}/>
        </>
    )
}

export default TransactionForm;



