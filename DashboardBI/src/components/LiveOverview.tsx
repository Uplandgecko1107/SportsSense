import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, Target, Clock, Map, Users, Zap } from 'lucide-react';

const LiveOverview = () => {
  // Sample data based on your CS:GO predictor
  const confidenceData = [
    { time: '14:30', confidence: 65.2, accuracy: 1 },
    { time: '14:31', confidence: 72.1, accuracy: 1 },
    { time: '14:33', confidence: 54.7, accuracy: 1 },
    { time: '14:34', confidence: 89.4, accuracy: 1 },
    { time: '14:36', confidence: 76.3, accuracy: 1 },
    { time: '14:38', confidence: 78.9, accuracy: 1 },
    { time: '14:39', confidence: 65.8, accuracy: 1 },
    { time: '14:41', confidence: 91.3, accuracy: 1 },
    { time: '14:42', confidence: 56.8, accuracy: 1 },
    { time: '14:44', confidence: 67.4, accuracy: 0 },
  ];

  const mapData = [
    { map: 'de_dust2', predictions: 15, accuracy: 73.3 },
    { map: 'de_mirage', predictions: 12, accuracy: 75.0 },
    { map: 'de_inferno', predictions: 8, accuracy: 62.5 },
    { map: 'de_cache', predictions: 10, accuracy: 80.0 },
    { map: 'de_overpass', predictions: 6, accuracy: 66.7 },
  ];

  const probabilityData = [
    { ct: 65.2, t: 34.8, result: 'CT' },
    { ct: 72.1, t: 27.9, result: 'CT' },
    { ct: 45.3, t: 54.7, result: 'T' },
    { ct: 89.4, t: 10.6, result: 'CT' },
    { ct: 23.7, t: 76.3, result: 'T' },
    { ct: 78.9, t: 21.1, result: 'CT' },
    { ct: 34.2, t: 65.8, result: 'T' },
    { ct: 91.3, t: 8.7, result: 'CT' },
  ];

  const kpiCards = [
    { title: 'Total Rounds', value: '150', icon: Target, color: 'from-blue-500 to-blue-600' },
    { title: 'Prediction Accuracy', value: '73.2%', icon: TrendingUp, color: 'from-green-500 to-green-600' },
    { title: 'Rounds Today', value: '45', icon: Clock, color: 'from-purple-500 to-purple-600' },
    { title: 'High Confidence', value: '89', icon: Zap, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm font-medium">{kpi.title}</p>
                  <p className="text-3xl font-bold text-white mt-1">{kpi.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${kpi.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prediction Confidence Timeline */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Prediction Confidence Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={confidenceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="confidence" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Accuracy Gauge */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Current Accuracy</h3>
          <div className="flex items-center justify-center h-[300px]">
            <div className="relative">
              <div className="w-48 h-48 rounded-full border-8 border-gray-700 relative">
                <div 
                  className="absolute inset-0 rounded-full border-8 border-green-500"
                  style={{
                    clipPath: 'polygon(50% 50%, 50% 0%, 85% 15%, 85% 85%, 15% 85%, 15% 15%)',
                    transform: 'rotate(-90deg)'
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white">73.2%</div>
                    <div className="text-white/70 text-sm">Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Performance */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Predictions by Map</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mapData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="map" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Bar dataKey="predictions" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CT vs T Probability Scatter */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">CT vs T Win Probabilities</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={probabilityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="ct" stroke="rgba(255,255,255,0.7)" name="CT Win %" />
              <YAxis dataKey="t" stroke="rgba(255,255,255,0.7)" name="T Win %" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Scatter dataKey="ct" fill="#F59E0B" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LiveOverview;