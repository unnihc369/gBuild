import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeadlinePage.css'

function DeadlinePage() {
    const [taskName, setTaskName] = useState('');
    const [isToday, setIsToday] = useState(true);
    const [deadlineDate, setDeadlineDate] = useState('');
    const [deadlines, setDeadlines] = useState([]);
    const [allDeadlines,setAllDeadlines] = useState([])
    const userId = JSON.parse(localStorage.getItem('user')).id;

    const fetchTodaysDeadlines = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/deadline/today/${userId}`);
            setDeadlines(response.data.deadlines);
        } catch (error) {
            console.error('Error fetching deadlines:', error);
        }
    };

    const fetchDeadlines = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/deadline/${userId}`);
            setAllDeadlines(response.data.deadlines);
        } catch (error) {
            console.error('Error fetching deadlines:', error);
        }
    };

    const addDeadline = async () => {
        try {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(deadlineDate)) {
                console.error('Invalid deadline date format. Use YYYY-MM-DD.');
                return;
            }
            const response = await axios.post('http://localhost:8000/deadline', {
                userId,
                taskName,
                deadlineDate,
            });
            console.log(response.data); // Log response for debugging

            setTaskName('');
            setDeadlineDate('');
            await fetchTodaysDeadlines();
        } catch (error) {
            console.error('Error adding deadline:', error);
        }
    };

    // Function to delete a deadline
    const deleteDeadline = async (deadlineId) => {
        try {
            await axios.delete(`http://localhost:8000/deadline/${deadlineId}`);
            // Fetch updated list of deadlines after deletion
            await fetchTodaysDeadlines();
        } catch (error) {
            console.error('Error deleting deadline:', error);
        }
    };

    useEffect(() => {
        fetchTodaysDeadlines();
        fetchDeadlines();
    }, [userId]);

    return (
        <div className="">
            <div className="add-deadline-container">
                <h2>Add Deadline</h2>
                <div className="deadlineform">
                <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} className="input-field" placeholder="Task Name" />
                <input type="date" value={deadlineDate} onChange={(e) => setDeadlineDate(e.target.value)} className="input-field" placeholder="Deadline Date" />
                <button onClick={addDeadline} className="button">Add Deadline</button>
                </div>
            </div>

            <div className=''>
                <div className='btn-row'><button className='btn' onClick={() => { setIsToday(true) }}>Today's Deadlines</button> <button className='btn' onClick={() => { setIsToday(false) }}>All Deadlines</button></div>
                {isToday ? <ul className="deadlines-list">
                    {deadlines.map((deadline) => (
                        <li key={deadline.id} className="deadline-item">
                            <p>Task: {deadline.taskName}</p>
                            {/* <p>Deadline Date: {deadline.deadlineDate}</p> */}
                            <button onClick={() => deleteDeadline(deadline.id)} className="delete-button">Delete</button>
                        </li>
                    ))}
                </ul> : <ul className="deadlines-list">
                    {allDeadlines.map((deadline) => (
                        <li key={deadline.id} className="deadline-item">
                            <p>Task: {deadline.taskName}</p>
                            <p>Deadline Date: {deadline.deadlineDate}</p>
                            <button onClick={() => deleteDeadline(deadline.id)} className="delete-button">Delete</button>
                        </li>
                    ))}
                </ul>}
                
            </div>
        </div>
    );
}

export default DeadlinePage;
