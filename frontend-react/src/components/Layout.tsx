import React from 'react';
import './Welcome.css';

interface UserData {
  name: string;
  email: string;
  role_id: number;
}

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  userData: UserData | null;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout, userData }) => {
  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="header">
        <div className="header-container">
          <h1 className="header-title">HR Systems</h1>
          <div className="header-right">
            <span className="username">{userData.name}</span>
            <button onClick={onLogout} className="sign-out-btn">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout; 