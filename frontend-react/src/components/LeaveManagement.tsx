import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './LeaveManagement.css';
import Layout from './Layout';
import LeaveRequestPopup from './LeaveRequestPopup';
import { useAuth } from '../contexts/AuthContext';

interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
  department_id: number;
}

interface LeaveRequest {
  id: number;
  user_id: number;
  start_date: string;
  end_date: string;
  status: string;
  type: string;
}

interface LeaveManagementProps {
  userData: User | null;
  onLogout: () => void;
}

const LeaveManagement: React.FC<LeaveManagementProps> = ({ userData, onLogout }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const { employees } = useAuth();

  useEffect(() => {
    if (userData) {
      console.log('🔵 Current logged-in user:', {
        id: userData.id,
        name: userData.name,
        role_id: userData.role_id
      });
      fetchLeaveRequests();
    }
  }, [userData]);

  const fetchLeaveRequests = async () => {
    // Implementation of fetchLeaveRequests
  };

  const handleNewLeave = () => {
    console.log('Opening new leave request popup');
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmitLeave = async (leaveData: any) => {
    // Implementation of handleSubmitLeave
  };

  return (
    <Layout onLogout={onLogout} userData={userData}>
      <div className="leave-container">
        <div className="leave-header">
          <h1>Leave Management</h1>
          <button className="new-leave-button" onClick={handleNewLeave}>
            <svg className="plus-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            New Leave
          </button>
        </div>
        
        {isPopupOpen && (
          <LeaveRequestPopup
            onClose={handleClosePopup}
            onSubmit={handleSubmitLeave}
            users={employees}
            currentUser={userData!}
          />
        )}

        <div className="date-picker-container">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            inline
          />
        </div>
      </div>
    </Layout>
  );
};

export default LeaveManagement; 