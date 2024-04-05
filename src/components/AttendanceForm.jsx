import React, { useState } from 'react';
import axios from 'axios';
import './AttendanceForm.css'; // Import your CSS file for styling

function AttendanceForm() {
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const userId = JSON.parse(localStorage.getItem('user')).id;

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

    const handleSemesterChange = (e) => {
        setSemester(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    return (
        <div className="attendance-form">
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <input type="text" placeholder="Semester" value={semester} onChange={handleSemesterChange} />
                    <input type="text" placeholder="Subject" value={subject} onChange={handleSubjectChange} />
                    <button type="submit">Create Attendance</button>
                </div>
            </form>
        </div>
    );
}

export default AttendanceForm;
