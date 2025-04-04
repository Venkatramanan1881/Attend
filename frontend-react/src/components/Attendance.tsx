import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Layout from './Layout';
import './Welcome.css';
import 'react-datepicker/dist/react-datepicker.css';
import './Attendance.css';

interface AttendanceProps {
  onLogout: () => void;
  userData: {
    name: string;
    email: string;
    role_id: number;
  } | null;
}

const Attendance: React.FC<AttendanceProps> = ({ onLogout, userData }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  console.log('Rendering Attendance component');
  console.log('userData:', userData);
  console.log('selectedDate:', selectedDate);

  if (!userData) {
    console.log('No user data, returning null');
    return null;
  }

  return (
    <Layout onLogout={onLogout} userData={userData}>
      <div className="attendance-container">
        <div className="attendance-content">
          <h2 className="text-xl font-medium mb-6">Attendance</h2>
          <div className="date-picker-container">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy"
              inline
              calendarClassName="custom-calendar"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Attendance; 