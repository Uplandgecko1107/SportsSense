import React from 'react';
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const ModelPerformance = () => {
  const calibrationData = [
    { predicted: 10, actual: 12, count: 5 },
    { predicted: 20, actual: 18, count: 8 },
    { predicted: 30, actual: 32, count: 12 },
    { predicted: 40, actual: 38, count: 15 },
    { predicted: 50, actual: 51, count: 20 },
    { predicted: 60, actual: 58, count: 18 },
    { predicted: 70, actual: 72, count: 16 },
    { predicted: 80, actual: 78, count: 12 },
    { predicted: 90, actual: 88, count: 8 },
  ];

  const confidenceDistribution = [
    { range: '0-10%', count: 2 },
    { range: '10-20%', count: 5 },
    { range: '20-30%', count: 8 },
    { range: '30-40%', count: 12 },
    { range: '40-50%', count: 18 },
    { range: '50-60%', count: 25 },
    { range: '60-70%', count: 22 },
    { range: '70-80%', count: 15 },
    { range: '80-90%', count: 10 },
    { range: '90-100%', count: 8 },
  ];

  const accuracyByConfidence = [
    { confidence: '50-60%', accuracy: 58, predictions: 25 },
    { confidence: '60-70%', accuracy: 65, predictions: 22 },
    { confidence: '70-80%', accuracy: 72, predictions: 15 },
    { confidence: '80-90%', accuracy: 78, predictions: 10 },
    { confidence: '90-100%', accuracy: 85, predictions: 8 },
  ];

  const accuracyTrend = [
    { date: 'Jan 10', accuracy: 68.5 },
    { date: 'Jan 11', accuracy: 70.2 },
    { date: 'Jan 12', accuracy: 69.8 },
    { date: 'Jan 13', accuracy: 72.1 },
    { date: 'Jan 14', accuracy: 71.5 },
    { date: 'Jan 15', accuracy: 73.2 },
    { date: 'Jan 16', accuracy: 74.8 },
  ];

  const confusionMatrix = [
    { predicted: 'CT', actual: 'CT', count: 45, color: '#10B981' },
    { predicted: 'CT', actual: 'T', count: 12, color: '#EF4444' },
    { predicted: 'T', actual: 'CT', count: 8, color: '#EF4444' },
    { predicted: 'T', actual: 'T', count: 35, color: '#10B981' },
  ];

  const performanceMetrics = [
    { 
      title: 'Overall Accuracy', 
      value: '73.2%', 
      change: '+2.1%', 
      icon: CheckCircle, 
      color: 'text-green-400',
      bgColor: 'from-green-500 to-green-600'
    },
    { 
      title: 'Precision', 
      value: '71.8%', 
      change: '+1.5%', 
      icon: Brain, 
      color: 'text-blue-400',
      bgColor: 'from-blue-500 to-blue-600'
    },
    { 
      title: 'Recall', 
      value: '74.6%', 
      change: '+2.8%', 
      icon: TrendingUp, 
      color: 'text-purple-400',
      bgColor: 'from-purple-500 to-purple-600'
    },
    { 
      title: 'F1 Score', 
      value: '73.2%', 
      change: '+2.2%', 
      icon: AlertTriangle, 
      color: 'text-orange-400',
      bgColor: 'from-orange-500 to-orange-600'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm font-medium">{metric.title}</p>
                  <p className="text-3xl font-bold text-white mt-1">{metric.value}</p>
                  <p className={`text-sm mt-1 ${metric.color}`}>{metric.change} from yesterday</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Calibration Plot */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          Model Calibration Plot
        </h3>
        <p className="text-white/70 text-sm mb-4">
          Shows how well predicted probabilities match actual outcomes. Points closer to the diagonal line indicate better calibration.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart data={calibrationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="predicted" 
              stroke="rgba(255,255,255,0.7)" 
              label={{ value: 'Predicted Probability (%)', position: 'insideBottom', offset: -10, fill: 'rgba(255,255,255,0.7)' }}
            />
            <YAxis 
              dataKey="actual" 
              stroke="rgba(255,255,255,0.7)"
              label={{ value: 'Actual Probability (%)', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.7)' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white'
              }} 
            />
            <Scatter dataKey="actual" fill="#3B82F6" />
            {/* Perfect calibration line */}
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#EF4444" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confidence Distribution */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Prediction Confidence Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={confidenceDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="range" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Accuracy by Confidence Level */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Accuracy by Confidence Level</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accuracyByConfidence}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="confidence" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Bar dataKey="accuracy" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accuracy Trend */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Accuracy Improvement Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={accuracyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" domain={['dataMin - 2', 'dataMax + 2']} />
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
                dataKey="accuracy" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Confusion Matrix Visualization */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Confusion Matrix</h3>
          <div className="grid grid-cols-2 gap-4 h-[300px]">
            <div className="space-y-2">
              <div className="text-center text-white/70 text-sm">Predicted CT</div>
              <div className="grid grid-rows-2 gap-2 h-full">
                <div className="bg-green-500/20 border border-green-500/40 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">45</div>
                    <div className="text-xs text-green-300">True CT</div>
                  </div>
                </div>
                <div className="bg-red-500/20 border border-red-500/40 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">8</div>
                    <div className="text-xs text-red-300">False CT</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-center text-white/70 text-sm">Predicted T</div>
              <div className="grid grid-rows-2 gap-2 h-full">
                <div className="bg-red-500/20 border border-red-500/40 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">12</div>
                    <div className="text-xs text-red-300">False T</div>
                  </div>
                </div>
                <div className="bg-green-500/20 border border-green-500/40 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">35</div>
                    <div className="text-xs text-green-300">True T</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-sm text-white/70">
            <span>Actual CT</span>
            <span>Actual T</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPerformance;