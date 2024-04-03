import React from 'react';

function ExpenseList({ expenses, onDelete, onUpdate }) {
    // Calculate total expense
    const totalExpense = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

    return (
        <div>
            {expenses.map((expense) => (
                <div key={expense.id}>
                    <p>Amount: {expense.amount}</p>
                    <p>Category: {expense.category}</p>
                    <button onClick={() => onDelete(expense.id)}>Delete</button>
                    {/* <button onClick={() => onUpdate(expense)}>Edit</button> */}
                </div>
            ))}
            <p>Total Expense: {totalExpense}</p>
        </div>
    );
}


export default ExpenseList;
