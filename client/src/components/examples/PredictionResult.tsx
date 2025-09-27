import { PredictionResult } from '../PredictionResult';

export default function PredictionResultExample() {
  // Mock data for demonstration
  const mockResult = {
    predictedScore: 187,
    confidence: 0.82,
    featureImportance: {
      "batting_team": 0.25,
      "bowling_team": 0.22,
      "venue": 0.18,
      "weather": 0.12,
      "day_night": 0.10,
      "team_strength_diff": 0.08,
      "overs": 0.05
    },
    matchFactors: {
      teamStrengthDiff: 1.2,
      venueAdvantage: 2.5,
      weatherImpact: -1.8,
      tossAdvantage: true
    }
  };

  return (
    <div className="p-4">
      <PredictionResult result={mockResult} />
    </div>
  );
}