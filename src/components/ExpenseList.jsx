import React from 'react';

function ExpenseList({ expenses, onDelete, onUpdate }) {
    return (
        <div>
            {expenses.map((expense) => (
                <div key={expense.id}>
                    <p>Amount: {expense.amount}</p>
                    <p>Category: {expense.category}</p>
                    <button onClick={() => onDelete(expense.id)}>Delete</button>
                    <button onClick={() => onUpdate(expense)}>Edit</button>
                </div>
            ))}
        </div>
    );
}

export default ExpenseList;
