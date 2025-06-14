import React from 'react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, Bomb, Users, Heart } from 'lucide-react';

const MatchAnalysis = () => {
  const mapWinRates = [
    { map: 'de_dust2', pistol: 80, gun: 70, eco: 45 },
    { map: 'de_mirage', pistol: 75, gun: 68, eco: 50 },
    { map: 'de_inferno', pistol: 65, gun: 72, eco: 40 },
    { map: 'de_cache', pistol: 85, gun: 75, eco: 55 },
    { map: 'de_overpass', pistol: 70, gun: 65, eco: 35 },
  ];

  const playerAdvantageData = [
    { advantage: '-3', winRate: 15, count: 8 },
    { advantage: '-2', winRate: 25, count: 12 },
    { advantage: '-1', winRate: 35, count: 18 },
    { advantage: '0', winRate: 50, count: 45 },
    { advantage: '+1', winRate: 65, count: 22 },
    { advantage: '+2', winRate: 75, count: 15 },
    { advantage: '+3', winRate: 85, count: 10 },
  ];

  const bombScenarios = [
    { name: 'No Bomb', value: 65, color: '#3B82F6' },
    { name: 'Bomb Planted', value: 35, color: '#EF4444' },
  ];

  const healthAdvantageData = [
    { round: 1, ctHealth: 500, tHealth: 500 },
    { round: 2, ctHealth: 380, tHealth: 485 },
    { round: 3, ctHealth: 245, tHealth: 320 },
    { round: 4, ctHealth: 475, tHealth: 180 },
    { round: 5, ctHealth: 150, tHealth: 380 },
    { round: 6, ctHealth: 420, tHealth: 285 },
    { round: 7, ctHealth: 180, tHealth: 245 },
    { round: 8, ctHealth: 490, tHealth: 95 },
  ];

  const recentPredictions = [
    { round: 15, map: 'de_dust2', ctProb: 67.4, tProb: 32.6, predicted: 'CT', actual: 'T', accuracy: 'Wrong' },
    { round: 14, map: 'de_dust2', ctProb: 73.5, tProb: 26.5, predicted: 'CT', actual: 'CT', accuracy: 'Correct' },
    { round: 13, map: 'de_dust2', ctProb: 29.8, tProb: 70.2, predicted: 'T', actual: 'T', accuracy: 'Correct' },
    { round: 12, map: 'de_dust2', ctProb: 85.6, tProb: 14.4, predicted: 'CT', actual: 'CT', accuracy: 'Correct' },
    { round: 11, map: 'de_dust2', ctProb: 42.1, tProb: 57.9, predicted: 'T', actual: 'T', accuracy: 'Correct' },
  ];

  return (
    <div className="space-y-6">
      {/* Win Rates Heatmap */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Win Rates by Map and Round Type
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mapWinRates}>
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
            <Bar dataKey="pistol" fill="#3B82F6" name="Pistol Rounds" />
            <Bar dataKey="gun" fill="#10B981" name="Gun Rounds" />
            <Bar dataKey="eco" fill="#F59E0B" name="Eco Rounds" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Player Advantage Impact */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Player Advantage Impact
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={playerAdvantageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="advantage" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="winRate" 
                stroke="#8B5CF6" 
                fill="rgba(139, 92, 246, 0.3)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bomb Plant Scenarios */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Bomb className="w-5 h-5 mr-2" />
            Bomb Plant Scenarios
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={bombScenarios}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {bombScenarios.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {bombScenarios.map((scenario, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: scenario.color }}
                ></div>
                <span className="text-white/70 text-sm">{scenario.name}: {scenario.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Advantage Over Time */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            Health Advantage Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={healthAdvantageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="round" stroke="rgba(255,255,255,0.7)" />
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
                dataKey="ctHealth" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="CT Health"
              />
              <Line 
                type="monotone" 
                dataKey="tHealth" 
                stroke="#EF4444" 
                strokeWidth={2}
                name="T Health"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Predictions Table */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Predictions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-white/70 py-2">Round</th>
                  <th className="text-left text-white/70 py-2">CT%</th>
                  <th className="text-left text-white/70 py-2">T%</th>
                  <th className="text-left text-white/70 py-2">Predicted</th>
                  <th className="text-left text-white/70 py-2">Actual</th>
                  <th className="text-left text-white/70 py-2">Result</th>
                </tr>
              </thead>
              <tbody>
                {recentPredictions.map((pred, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="text-white py-2">{pred.round}</td>
                    <td className="text-white py-2">{pred.ctProb}%</td>
                    <td className="text-white py-2">{pred.tProb}%</td>
                    <td className="text-white py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        pred.predicted === 'CT' ? 'bg-blue-500/20 text-blue-300' : 'bg-red-500/20 text-red-300'
                      }`}>
                        {pred.predicted}
                      </span>
                    </td>
                    <td className="text-white py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        pred.actual === 'CT' ? 'bg-blue-500/20 text-blue-300' : 'bg-red-500/20 text-red-300'
                      }`}>
                        {pred.actual}
                      </span>
                    </td>
                    <td className="text-white py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        pred.accuracy === 'Correct' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                      }`}>
                        {pred.accuracy}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchAnalysis;