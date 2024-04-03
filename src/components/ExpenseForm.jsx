import React, { useState } from 'react';

function ExpenseForm({ onSubmit, expense }) {
    const [amount, setAmount] = useState(expense ? expense.amount : '');
    const [category, setCategory] = useState(expense ? expense.category : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ amount, category });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <button type="submit">{expense ? 'Update' : 'Add'} Expense</button>
        </form>
    );
}

export default ExpenseForm;
