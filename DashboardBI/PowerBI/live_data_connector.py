import pandas as pd
import json
import time
import os
from datetime import datetime
import threading
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class PredictionFileWatcher(FileSystemEventHandler):
    """Monitor predictions.txt file for changes and update Power BI data"""
    
    def __init__(self, processor):
        self.processor = processor
        self.last_modified = 0
        
    def on_modified(self, event):
        if event.src_path.endswith('predictions.txt'):
            # Avoid duplicate processing
            current_time = time.time()
            if current_time - self.last_modified > 1:  # 1 second cooldown
                self.last_modified = current_time
                print(f"Predictions file updated at {datetime.now()}")
                self.processor.process_new_predictions()

class LiveDataProcessor:
    """Process CS:GO predictions in real-time for Power BI"""
    
    def __init__(self, predictions_file="predictions.txt", output_file="live_csgo_data.csv"):
        self.predictions_file = predictions_file
        self.output_file = output_file
        self.processed_lines = 0
        self.current_match_id = 1
        self.current_round = 1
        self.match_start_time = datetime.now()
        
        # Initialize with headers if file doesn't exist
        if not os.path.exists(output_file):
            self.initialize_output_file()
    
    def initialize_output_file(self):
        """Create CSV file with headers"""
        headers = [
            'timestamp', 'match_id', 'round_number', 'ct_win_probability', 
            't_win_probability', 'predicted_winner', 'prediction_confidence',
            'probability_difference', 'high_confidence', 'close_round'
        ]
        
        df = pd.DataFrame(columns=headers)
        df.to_csv(self.output_file, index=False)
        print(f"Initialized {self.output_file}")
    
    def parse_prediction_line(self, line):
        """Parse a single prediction line"""
        line = line.strip()
        if not line or '[' not in line or ']' not in line:
            return None
            
        try:
            # Extract prediction values
            pred_str = line[line.find('['):line.find(']')+1]
            pred_values = eval(pred_str)
            
            ct_prob = float(pred_values[0])
            t_prob = float(pred_values[1])
            
            # Create data record
            record = {
                'timestamp': datetime.now(),
                'match_id': self.current_match_id,
                'round_number': self.current_round,
                'ct_win_probability': ct_prob,
                't_win_probability': t_prob,
                'predicted_winner': 'CT' if ct_prob > t_prob else 'T',
                'prediction_confidence': max(ct_prob, t_prob),
                'probability_difference': abs(ct_prob - t_prob),
                'high_confidence': max(ct_prob, t_prob) > 70,
                'close_round': abs(ct_prob - t_prob) < 20
            }
            
            self.current_round += 1
            
            # Reset for new match (assuming 30 rounds max)
            if self.current_round > 30:
                self.current_match_id += 1
                self.current_round = 1
                self.match_start_time = datetime.now()
            
            return record
            
        except Exception as e:
            print(f"Error parsing line: {line}, Error: {e}")
            return None
    
    def process_new_predictions(self):
        """Process new predictions and append to CSV"""
        try:
            with open(self.predictions_file, 'r') as file:
                lines = file.readlines()
            
            # Process only new lines
            new_lines = lines[self.processed_lines:]
            new_records = []
            
            for line in new_lines:
                record = self.parse_prediction_line(line)
                if record:
                    new_records.append(record)
            
            if new_records:
                # Append to CSV
                df_new = pd.DataFrame(new_records)
                df_new.to_csv(self.output_file, mode='a', header=False, index=False)
                
                print(f"Added {len(new_records)} new predictions to {self.output_file}")
                
                # Update processed lines count
                self.processed_lines = len(lines)
                
                # Update summary statistics
                self.update_summary_stats(new_records)
            
        except FileNotFoundError:
            print(f"Predictions file {self.predictions_file} not found")
        except Exception as e:
            print(f"Error processing predictions: {e}")
    
    def update_summary_stats(self, new_records):
        """Update real-time summary statistics"""
        stats = {
            'last_update': datetime.now().isoformat(),
            'total_predictions': self.processed_lines,
            'current_match': self.current_match_id,
            'current_round': self.current_round,
            'recent_predictions': len(new_records),
            'avg_confidence': sum(r['prediction_confidence'] for r in new_records) / len(new_records) if new_records else 0,
            'high_confidence_count': sum(1 for r in new_records if r['high_confidence']),
            'close_rounds_count': sum(1 for r in new_records if r['close_round'])
        }
        
        with open('live_stats.json', 'w') as f:
            json.dump(stats, f, indent=2)
    
    def start_monitoring(self):
        """Start monitoring predictions file for changes"""
        event_handler = PredictionFileWatcher(self)
        observer = Observer()
        observer.schedule(event_handler, path='.', recursive=False)
        observer.start()
        
        print(f"Started monitoring {self.predictions_file} for changes...")
        print("Press Ctrl+C to stop monitoring")
        
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            observer.stop()
            print("\nStopped monitoring")
        
        observer.join()

class PowerBIDataRefresh:
    """Handle Power BI data refresh operations"""
    
    def __init__(self, dataset_id=None, workspace_id=None):
        self.dataset_id = dataset_id
        self.workspace_id = workspace_id
    
    def trigger_refresh(self):
        """Trigger Power BI dataset refresh (requires Power BI REST API setup)"""
        # This would require Power BI REST API authentication
        # For now, we'll just create a refresh trigger file
        
        refresh_info = {
            'refresh_requested': datetime.now().isoformat(),
            'data_file': 'live_csgo_data.csv',
            'status': 'pending'
        }
        
        with open('powerbi_refresh_trigger.json', 'w') as f:
            json.dump(refresh_info, f, indent=2)
        
        print("Power BI refresh triggered")

def main():
    """Main function to start live data processing"""
    print("CS:GO Live Data Processor for Power BI")
    print("=" * 40)
    
    processor = LiveDataProcessor()
    
    # Process any existing predictions first
    processor.process_new_predictions()
    
    # Start monitoring for new predictions
    processor.start_monitoring()

if __name__ == "__main__":
    main()