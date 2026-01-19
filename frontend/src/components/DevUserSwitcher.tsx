import React, { useState } from 'react';
import { Users, X } from 'lucide-react';
import authService from '../services/authService';

const DevUserSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentEmail = authService.getCurrentMockUserEmail();
  const mockUsers = authService.getAvailableMockUsers();

  const handleUserSwitch = (email: string) => {
    authService.switchMockUser(email);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        title="Switch Mock User (Dev Only)"
      >
        <Users size={24} />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Switch Mock User</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Development mode: Select a user to test different roles and permissions
            </p>

            <div className="space-y-2">
              {mockUsers.map((user) => (
                <button
                  key={user.email}
                  onClick={() => handleUserSwitch(user.email)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    currentEmail === user.email
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Role: <span className="font-medium">{user.role}</span> • Sites:{' '}
                    {user.siteIds.join(', ')}
                  </div>
                  {currentEmail === user.email && (
                    <div className="text-xs text-blue-600 font-medium mt-2">
                      ✓ Currently active
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
              <strong>Dev Only:</strong> This component is only visible in development mode
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DevUserSwitcher;
