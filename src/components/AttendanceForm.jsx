import React, { useState } from 'react';
import axios from 'axios';

function AttendanceForm() {
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const userId = JSON.parse(localStorage.getItem('user')).userId;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/attend', {
                userId,
                semester,
                subject,
            });
            if (response.status === 200) {
                alert('Attendance created successfully!');
            }
        } catch (error) {
            console.error('Error creating attendance:', error);
        }
    };

    return (
        <div className="create-attendance">
            <h2>Create Attendance</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Semester:
                    <input type="text" value={semester} onChange={(e) => setSemester(e.target.value)} />
                </label>
                <label>
                    Subject:
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
                </label>
                <button type="submit">Create Attendance</button>
            </form>
        </div>
    );
}

export default AttendanceForm;
