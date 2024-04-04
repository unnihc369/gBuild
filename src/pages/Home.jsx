// Home.js
import React,{useState} from 'react';
import './Home.css';
import ExpensePage from './ExpensePage';
import TestScorePage from './TestScorePage';


import AttendancePage from './AttendancePage';
import DeadlinePage from './DeadLinePage';

function Home() {
  // Retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user'));

  const [activeTab, setActiveTab] = useState('deadline');

  const tabContents = {
    deadline: <DeadlinePage/>,
    attendance: <AttendancePage/>,
    expense: <ExpensePage/>,
    testscores: <TestScorePage/>
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="home-container">
      <div className='left-panel'>
        <div className="profile-panel">
          <h2>Profile</h2>
          <div className="profile-details">
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
            <p><strong>Semester:</strong> {userData.sem}</p>
          </div>
          <div className="tabs">
            <button className={activeTab === 'deadline' ? 'active' : ''} onClick={() => handleTabClick('deadline')}>Deadline</button>
            <button className={activeTab === 'attendance' ? 'active' : ''} onClick={() => handleTabClick('attendance')}>Attendance</button>
            <button className={activeTab === 'expense' ? 'active' : ''} onClick={() => handleTabClick('expense')}>Expense Tracker</button>
            <button className={activeTab === 'testscores' ? 'active' : ''} onClick={() => handleTabClick('testscores')}>Test Scores</button>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container">
          {tabContents[activeTab]}
        </div>
      </div>
    </div>
  );
}

export default Home;
