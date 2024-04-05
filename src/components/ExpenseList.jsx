import React from 'react';
import './ExpenseList.css'; // Import CSS file for styling

function ExpenseList({ expenses, onDelete, onUpdate }) {
    // Calculate total expense
    const totalExpense = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

    return (
        <div className="expense-list-container">
            {expenses.map((expense) => (
                <div key={expense.id} className="expense-item">
                    <p className="expense-amount">Amount: {expense.amount}</p>
                    <p className="expense-category">Category: {expense.category}</p>
                    <div className="button-group">
                        <button className="delete-button" onClick={() => onDelete(expense.id)}>Delete</button>
                        {/* <button className="edit-button" onClick={() => onUpdate(expense)}>Edit</button> */}
                    </div>
                </div>
            ))}
            <p className="total-expense">Total Expense: {totalExpense}</p>
        </div>
    );
}

export default ExpenseList;
