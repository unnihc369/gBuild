import React from 'react'; // Import useNavigate hook
import AttendanceList from '../components/AttendanceList';
import AttendanceForm from '../components/AttendanceForm';

const AttendancePage = () => {

  return (
    <div>
      <h1 className="">Attendance Tracker</h1>
      <AttendanceForm />
      <AttendanceList />
    </div>
  );
};

export default AttendancePage;
