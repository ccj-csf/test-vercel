'use client';
import React from 'react';

interface TabNavigationProps {
  currentTab: 'Instruments' | 'Styles';
  setTab: (tab: 'Instruments' | 'Styles') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ currentTab, setTab }) => {
  return (
    <div className="mb-4 flex justify-center space-x-4">
      <button
        className={`px-4 py-2 ${currentTab === 'Instruments' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'} rounded`}
        onClick={() => setTab('Instruments')}
      >
        Instruments
      </button>
      <button
        className={`px-4 py-2 ${currentTab === 'Styles' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'} rounded`}
        onClick={() => setTab('Styles')}
      >
        Styles
      </button>
    </div>
  );
};

export default TabNavigation;
