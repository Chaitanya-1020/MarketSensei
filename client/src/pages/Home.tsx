import { useState } from "react";
import { Header } from "@/components/Header";
import { PredictionForm } from "@/components/PredictionForm";
import { PredictionResult } from "@/components/PredictionResult";
import { type PredictionInput, type PredictionResult as PredictionResultType } from "@shared/schema";

export default function Home() {
  const [prediction, setPrediction] = useState<PredictionResultType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrediction = async (data: PredictionInput) => {
    setIsLoading(true);
    console.log("Making prediction for:", data);
    
    // Simulate API call with mock prediction
    // TODO: Replace with actual API call to backend
    setTimeout(() => {
      const mockResult: PredictionResultType = {
        predictedScore: Math.floor(Math.random() * (240 - 100) + 100), // Random score between 100-240
        confidence: Math.random() * 0.4 + 0.6, // Random confidence between 0.6-1.0
        featureImportance: {
          "batting_team": Math.random() * 0.3,
          "bowling_team": Math.random() * 0.3, 
          "venue": Math.random() * 0.2,
          "weather": Math.random() * 0.15,
          "day_night": Math.random() * 0.1,
          "team_strength_diff": Math.random() * 0.1,
          "overs": Math.random() * 0.05,
          "wickets": Math.random() * 0.05,
          "toss_advantage": Math.random() * 0.05
        },
        matchFactors: {
          teamStrengthDiff: (Math.random() - 0.5) * 4, // Between -2 and 2
          venueAdvantage: (Math.random() - 0.5) * 6, // Between -3 and 3
          weatherImpact: (Math.random() - 0.5) * 8, // Between -4 and 4
          tossAdvantage: data.tossWinner === data.battingTeam
        }
      };
      
      setPrediction(mockResult);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Predict IPL Match Scores
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use advanced machine learning to predict T20 cricket match scores. 
              Analyze team performance, venue conditions, and match scenarios for accurate predictions.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Prediction Form */}
            <div className="space-y-6">
              <PredictionForm 
                onSubmit={handlePrediction} 
                isLoading={isLoading}
              />
            </div>

            {/* Prediction Result */}
            <div className="space-y-6">
              {isLoading ? (
                <PredictionResult 
                  result={{} as PredictionResultType} 
                  isLoading={true}
                />
              ) : prediction ? (
                <PredictionResult result={prediction} />
              ) : (
                <div className="w-full max-w-2xl mx-auto lg:mx-0">
                  <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                    <div className="space-y-4">
                      <div className="text-4xl">🏏</div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Ready to Predict
                      </h3>
                      <p className="text-muted-foreground">
                        Fill in the match details to get your ML-powered score prediction
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="text-2xl">🤖</div>
              <h3 className="font-semibold">ML-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Advanced RandomForest algorithm trained on comprehensive IPL data
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="text-2xl">📊</div>
              <h3 className="font-semibold">Data-Driven</h3>
              <p className="text-sm text-muted-foreground">
                Considers team strength, venue conditions, weather, and match scenarios
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="text-2xl">⚡</div>
              <h3 className="font-semibold">Real-Time</h3>
              <p className="text-sm text-muted-foreground">
                Instant predictions with confidence scores and factor analysis
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}