import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AttendanceList() {
    const [attendanceData, setAttendanceData] = useState([]);
    const userId = JSON.parse(localStorage.getItem('user')).userId;

    useEffect(() => {
        // Fetch attendance data for the user
        const fetchAttendanceData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/attend/${userId}`);
                console.log(response);
                setAttendanceData(response.data.attendance);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };
        fetchAttendanceData();
    }, [userId]);

    const handleUpdateAttendance = async (subject, id, semester,  type) => {
        try {
            let updatedTotalClasses;
            let updatedClassesAttended;

            const recordIndex = attendanceData.findIndex((record) => record.subject === subject);
            if (recordIndex !== -1) {
                const record = attendanceData[recordIndex];
                updatedTotalClasses = record.totalClasses;
                updatedClassesAttended = record.classesAttended;

                if (type === 'totalClasses') {
                    updatedTotalClasses += 1;
                } else if (type === 'classesAttended') {
                    updatedTotalClasses += 1;
                    updatedClassesAttended += 1;
                }
                console.log(`http://localhost:8000/attend/${id}`);
                // Update the attendance record
                const response = await axios.post(`http://localhost:8000/attend/${id}`, {
                    subject,
                    semester,
                    totalClasses: updatedTotalClasses,
                    classesAttended: updatedClassesAttended,
                });
                if (response.data.message === 'Attendance updated successfully!') {
                    setAttendanceData((prevAttendanceData) => {
                        const updatedAttendanceData = [...prevAttendanceData];
                        updatedAttendanceData[recordIndex] = {
                            ...updatedAttendanceData[recordIndex],
                            totalClasses: updatedTotalClasses,
                            classesAttended: updatedClassesAttended,
                        };
                        return updatedAttendanceData;
                    });
                }
            }
        } catch (error) {
            console.error('Error updating attendance:', error);
        }
    };



    return (
        <div className="attendance-management">
            <div className="attendance-list">
                {attendanceData.map((record) => (
                    <div key={record.subject} className="attendance-record">
                        <p>Subject: {record.subject}</p>
                        <p>Total Classes: {record.totalClasses}</p>
                        <p>Total Classes: {record.semester}</p>
                        <p>Classes Attended: {record.classesAttended}</p>
                        <p>Attendance Percentage: {record.attendancePercentage}%</p>
                        <div className="button-group">
                            <button onClick={() => handleUpdateAttendance(record.subject,record.id, record.semester, 'totalClasses')} className="update-button">Update Total Classes</button>
                            <button onClick={() => handleUpdateAttendance(record.subject,record.id, record.semester, 'classesAttended')} className="update-button">Update Both</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AttendanceList;
