import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import axios from 'axios'

function ExpensePage() {
    const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);
    const userId = JSON.parse(localStorage.getItem('user')).id;

    useEffect(() => {
        // Fetch expenses on component mount
        getExpenses();
    }, []);

    const getExpenses = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem('user')).id;
            const response = await axios.get(`http://localhost:8000/expense/${userId}`, {
                data: { userId },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.data;
            console.log(data);
            setExpenses(data.expenses);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const addExpense = async (expenseData) => {
        try {
            const response = await fetch('http://localhost:8000/expense', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expenseData),
            });
            const data = await response.json();
            setExpenses([...expenses, { id: data.expenseId, ...expenseData }]);
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const updateExpense = async (expenseData) => {
        try {
            const response = await fetch(`http://localhost:8000/expense/${expenseData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expenseData),
            });
            const data = await response.json();
            setExpenses(expenses.map((expense) => (expense.id === expenseData.id ? { ...expense, ...expenseData } : expense)));
            setEditingExpense(null);
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    const deleteExpense = async (expenseId) => {
        try {
            await fetch(`http://localhost:8000/expense/${expenseId}`, {
                method: 'DELETE',
            });
            setExpenses(expenses.filter((expense) => expense.id !== expenseId));
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    return (
        <div>
            <h1>Expense Tracker</h1>
            <ExpenseList expenses={expenses} onDelete={deleteExpense} onUpdate={setEditingExpense} />
            <ExpenseForm onSubmit={editingExpense ? updateExpense : addExpense} expense={editingExpense} />
        </div>
    );
}

export default ExpensePage;
