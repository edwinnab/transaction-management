function TransactionRow ({data}) {
    const handleDeposit = async () => {
        const id = data.account_id
        try {
            // Step 1: Fetch account details
            const response = await fetch(`https://infra.devskills.app/api/accounting/accounts/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch account details');
            }
            //Step 2: get the currect account balance 
            const currentBalance = data.amount;
            // Step 3: Ask user to enter amount to deposit
            const amountToDeposit = parseFloat(prompt('Enter amount to deposit:'));
            if (isNaN(amountToDeposit) || amountToDeposit <= 0) {
                throw new Error('Invalid deposit amount');
            }
            // Optional: If successful, you might want to update the UI or show a success message
            alert(`Transferred ${amountToDeposit} to account ${id}`);
            // Step 4: Add the amount to the current account balance
            const updatedBalance = parseFloat(currentBalance) + amountToDeposit;
            const depositContainer = document.getElementById(`deposit-history-${id}`)
            //how can I add the div element data on top of the table
            const div = document.createElement('div')
             // should have an enclosing <div /> with the following structure: 
            div.innerHTML = `
                <div>
                <h3 data-type="transaction">Transaction amount (deposit)</h3> 
                <p>Account id: ${id}</p>
                <p>Deposit amount: ${amountToDeposit}</p>
                <p>New account balance: ${updatedBalance}</p>
                </div>
            `
            depositContainer.appendChild(div)
            
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    const handleWithdraw = async () => {
        const id = data.account_id
        try {
            // Step 1: Fetch account details
            const response = await fetch(`https://infra.devskills.app/api/accounting/accounts/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch account details');
            }
            //Step 2: get the currect account balance 
            const currentBalance = data.amount;
            // Step 3: Ask user to enter amount to withdraw
            const amountToWithdraw = parseFloat(prompt('Enter amount to withdraw:'));
            if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
                throw new Error('Invalid deposit amount');
            }
            // Optional: If successful, you might want to update the UI or show a success message
            alert(`Transaction ${amountToWithdraw} from account ${id}`);
            // Step 4: Add the amount to the current account balance
            const updatedBalance = parseFloat(currentBalance) - amountToWithdraw;
            const withdrawContainer = document.getElementById(`withdraw-history-${id}`)
            const div = document.createElement('div')
            // should have an enclosing <div /> with the following structure: 
            div.innerHTML = `
                <div>
                <h3 data-type="transaction">Transaction amount (withdrawal)</h3>
                <p data-account-id="${data.account_id} class="text-gray-700">Account ID: ${data.account_id}</p>
                <p data-amount="${amountToWithdraw}">Amount: ${amountToWithdraw}</p>
                <p data-balance="${updatedBalance}">New Balance: ${updatedBalance}</p>
                </div>
            `
            withdrawContainer.appendChild(div)
            
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    return (
        <tr
            data-type="transaction"
            key={data.transaction_id}
            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td
            data-account-id="${transaction-account-id}" 
            className="px-6 py-4">
                {data.account_id}
            </td>
            <td
            data-amount="${transaction-amount}" 
            className="px-6 py-4">
                {data.amount}
            </td>
            <td className="px-6 py-4">            
                <button 
                onClick={handleDeposit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded">Deposit</button> 
                <button 
                onClick={handleWithdraw}
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Withdraw</button>    
            </td>
            <td id={`deposit-history-${data.account_id}`} className="text-blue-500 italic font-serif"></td>
            <td id={`withdraw-history-${data.account_id}`} className="text-orange-500 italic font-serif"></td>
        </tr>
    )
}

export default TransactionRow