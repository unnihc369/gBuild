import React from 'react'
import AttendanceList from '../components/AttendanceList'
import AttendanceForm from '../components/AttendanceForm'

const AttendancePage = () => {
  return (
    <div>
      <h1 className="">Attendance Tracker</h1>
      <AttendanceList />
      <AttendanceForm />
    </div>
  )
}

export default AttendancePage
