import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './Welcome.css';

interface UserData {
  name: string;
  email: string;
  role_id: number;
}

interface WelcomeProps {
  onLogout: () => void;
  userData: UserData | null;
}

const Welcome: React.FC<WelcomeProps> = ({ onLogout, userData }) => {
  const navigate = useNavigate();

  if (!userData) {
    return null;
  }

  return (
    <Layout onLogout={onLogout} userData={userData}>
      <div className="tiles-container">
        {/* Attendance Tile */}
        <div className="tile" onClick={() => navigate('/attendance')}>
          <svg className="tile-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="16" cy="16" r="2" fill="currentColor"/>
          </svg>
          <span className="tile-title">Attendance</span>
        </div>

        {/* Employees Tile */}
        <div className="tile">
          <svg className="tile-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="tile-title">Employees</span>
        </div>

        {/* Leave Management Tile */}
        <div className="tile" onClick={() => navigate('/leave-management')}>
          <svg className="tile-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="tile-title">Leave Management</span>
        </div>
      </div>
    </Layout>
  );
};

export default Welcome; 