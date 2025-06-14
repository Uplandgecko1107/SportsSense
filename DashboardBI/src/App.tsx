import React, { useState } from 'react';
import { Activity, Target, TrendingUp, Map, Clock, Users } from 'lucide-react';
import LiveOverview from './components/LiveOverview';
import MatchAnalysis from './components/MatchAnalysis';
import ModelPerformance from './components/ModelPerformance';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Live Overview', icon: Activity },
    { id: 'analysis', label: 'Match Analysis', icon: Target },
    { id: 'performance', label: 'Model Performance', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">CS:GO Predictor Dashboard</h1>
                <p className="text-blue-200 text-sm">Real-time match prediction analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Live</span>
              </div>
              <div className="text-sm opacity-75">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex space-x-1 bg-black/20 backdrop-blur-sm rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        {activeTab === 'overview' && <LiveOverview />}
        {activeTab === 'analysis' && <MatchAnalysis />}
        {activeTab === 'performance' && <ModelPerformance />}
      </div>
    </div>
  );
}

export default App;