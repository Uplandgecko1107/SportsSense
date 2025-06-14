# CS:GO Predictor Power BI Dashboard

This Power BI dashboard visualizes data from your CS:GO round prediction system, providing insights into prediction accuracy, match patterns, and model performance.

## Setup Instructions

### 1. Data Preparation
1. Run your CS:GO predictor (`MainApp.py`) to generate `predictions.txt`
2. Execute `data_transformation.py` to convert your prediction data into Power BI format:
   ```bash
   python data_transformation.py
   ```
3. This will create `csgo_dashboard_data.csv` ready for Power BI import

### 2. Power BI Setup
1. Open Power BI Desktop
2. Click "Get Data" → "Text/CSV"
3. Select `csgo_dashboard_data.csv`
4. Click "Load" to import the data

### 3. Create Measures
1. In Power BI, go to "Modeling" tab
2. Click "New Measure"
3. Copy and paste each measure from `dashboard_measures.dax`
4. Create all the measures listed in the file

### 4. Dashboard Components

#### Page 1: Live Predictions Overview
- **KPI Cards**: Total Rounds, Prediction Accuracy, Rounds Today
- **Line Chart**: Prediction confidence over time
- **Gauge Chart**: Current prediction accuracy
- **Bar Chart**: Predictions by map
- **Scatter Plot**: CT vs T win probabilities

#### Page 2: Match Analysis
- **Heatmap**: Win rates by map and round type
- **Stacked Bar**: Player advantages impact on predictions
- **Area Chart**: Health advantages over time
- **Donut Chart**: Bomb plant scenarios
- **Table**: Recent predictions with accuracy

#### Page 3: Model Performance
- **Calibration Plot**: Predicted vs Actual outcomes
- **Histogram**: Prediction confidence distribution
- **Box Plot**: Accuracy by confidence levels
- **Trend Line**: Accuracy improvement over time
- **Matrix**: Confusion matrix visualization

## Key Metrics Explained

### Prediction Accuracy
- **Formula**: (Correct Predictions / Total Predictions) × 100
- **Good Range**: 65-75% (CS:GO is inherently unpredictable)
- **Excellent**: >80%

### Prediction Confidence
- **Definition**: Higher of CT/T win probabilities
- **High Confidence**: >70%
- **Low Confidence**: <60%

### Close Rounds
- **Definition**: Rounds where probability difference <20%
- **Indicates**: Uncertain/balanced situations

## Dashboard Features

### Real-time Updates
- Refresh data source to see latest predictions
- Auto-refresh can be set up for live monitoring

### Interactive Filtering
- Filter by map, date, confidence level
- Drill-down capabilities for detailed analysis

### Alerts & Notifications
- Set up alerts for accuracy drops
- Monitor prediction confidence trends

## Customization Options

### Adding New Visualizations
1. **Prediction Timeline**: Show predictions chronologically
2. **Map Heatmaps**: Visualize round positions and outcomes
3. **Player Impact**: Analyze individual player statistics
4. **Economic Rounds**: Track economy impact on predictions

### Custom Measures
Add these additional measures for deeper insights:

```dax
// Streak Analysis
Current Accuracy Streak = 
// Calculate consecutive correct predictions

// Map Difficulty
Map Difficulty Score = 
// Based on prediction variance and accuracy

// Time-based Performance
Peak Performance Hours = 
// Identify best performing time periods
```

## Troubleshooting

### Common Issues
1. **Data Not Loading**: Check CSV file format and encoding
2. **Measures Not Working**: Ensure column names match exactly
3. **Visualizations Empty**: Verify data relationships

### Data Quality Checks
- Ensure timestamps are properly formatted
- Verify probability values sum to 100
- Check for missing or null values

## Integration with Your CS:GO Predictor

### Automated Data Pipeline
1. Modify `MainApp.py` to output structured data
2. Set up scheduled refresh in Power BI Service
3. Use Power Automate for real-time updates

### Enhanced Data Collection
Consider collecting additional data points:
- Round economy information
- Player positions and equipment
- Map-specific statistics
- Tournament/match context

## Deployment Options

### Power BI Service
1. Publish dashboard to Power BI Service
2. Set up automatic refresh schedules
3. Share with team members

### Embedded Analytics
- Embed dashboard in web applications
- Use Power BI REST APIs for custom integration
- Mobile app compatibility

## Performance Optimization

### Data Model Optimization
- Use appropriate data types
- Create relationships between tables
- Implement row-level security if needed

### Visual Performance
- Limit data points in scatter plots
- Use aggregations for large datasets
- Optimize DAX measures for performance

This dashboard will help you monitor your CS:GO predictor's performance, identify patterns in match data, and continuously improve your prediction model's accuracy.