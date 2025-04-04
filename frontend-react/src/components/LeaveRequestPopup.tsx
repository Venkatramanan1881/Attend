import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './LeaveRequestPopup.css';

interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
  department_id: number;
}

interface LeaveRequestPopupProps {
  onClose: () => void;
  onSubmit: (leaveData: any) => void;
  users: User[];
  currentUser: User;
}

const LeaveRequestPopup: React.FC<LeaveRequestPopupProps> = ({
  onClose,
  onSubmit,
  users,
  currentUser
}) => {
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [leaveType, setLeaveType] = useState<string>('casual');

  // Debug logs for props
  useEffect(() => {
    if (users.length > 0 && currentUser) {
      console.log('Popup opened with users:', users);
      console.log('Current user:', currentUser);
    }
  }, [users, currentUser]);

  // Reset form when popup opens/closes
  useEffect(() => {
    setSelectedUser(0);
    setStartDate(null);
    setEndDate(null);
    setLeaveType('casual');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting leave request:', {
      userId: selectedUser,
      startDate,
      endDate,
      leaveType
    });
    onSubmit({
      userId: selectedUser,
      startDate,
      endDate,
      leaveType
    });
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h2>New Leave Request</h2>
          <button className="close-button" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="leave-form">
          <div className="form-group">
            <label htmlFor="user">Select User</label>
            <select
              id="user"
              value={selectedUser}
              onChange={(e) => {
                const value = Number(e.target.value);
                console.log('Selected user ID:', value);
                setSelectedUser(value);
              }}
              required
            >
              <option value="0">Select a user</option>
              {Array.isArray(users) && users.length > 0 ? (
                users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>No users available</option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="leaveType">Leave Type</label>
            <select
              id="leaveType"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              required
            >
              <option value="casual">Casual Leave</option>
              <option value="vacation">Vacation</option>
              <option value="sick">Sick Leave</option>
            </select>
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              dateFormat="MMMM d, yyyy"
              className="date-picker"
              required
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <DatePicker
              selected={endDate}
              onChange={setEndDate}
              dateFormat="MMMM d, yyyy"
              className="date-picker"
              minDate={startDate || undefined}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequestPopup; 