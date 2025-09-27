import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Target, TrendingUp, Activity, Award } from "lucide-react";
import { type PredictionResult } from "@shared/schema";

interface PredictionResultProps {
  result: PredictionResult;
  isLoading?: boolean;
}

export function PredictionResult({ result, isLoading = false }: PredictionResultProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 animate-pulse text-primary" />
            Analyzing...
          </CardTitle>
          <CardDescription>Processing match conditions with ML model</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-32 bg-muted animate-pulse rounded-lg" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-muted animate-pulse rounded-lg" />
              <div className="h-20 bg-muted animate-pulse rounded-lg" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const confidencePercentage = Math.round(result.confidence * 100);
  const confidenceColor = confidencePercentage >= 80 ? "default" as const : confidencePercentage >= 60 ? "secondary" as const : "destructive" as const;

  // Prepare feature importance data for chart
  const featureData = Object.entries(result.featureImportance)
    .map(([feature, importance]) => ({
      feature: feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      importance: Math.round(importance * 100)
    }))
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 6);

  const getScoreCategory = (score: number) => {
    if (score >= 200) return { category: "Excellent", color: "default" as const, icon: Award };
    if (score >= 170) return { category: "Good", color: "default" as const, icon: TrendingUp };
    if (score >= 140) return { category: "Average", color: "secondary" as const, icon: Target };
    return { category: "Below Par", color: "destructive" as const, icon: Target };
  };

  const scoreInfo = getScoreCategory(result.predictedScore);
  const ScoreIcon = scoreInfo.icon;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Prediction Result
        </CardTitle>
        <CardDescription>
          ML model analysis based on match conditions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Score Prediction */}
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <div className="text-5xl font-bold text-foreground" data-testid="text-predicted-score">
              {result.predictedScore}
            </div>
            <div className="flex items-center justify-center gap-2">
              <Badge variant={scoreInfo.color} className="flex items-center gap-1">
                <ScoreIcon className="h-3 w-3" />
                {scoreInfo.category}
              </Badge>
              <Badge variant={confidenceColor}>
                {confidencePercentage}% Confidence
              </Badge>
            </div>
          </div>
          
          <Progress 
            value={confidencePercentage} 
            className="w-full max-w-xs mx-auto" 
            data-testid="progress-confidence"
          />
        </div>

        {/* Match Factors */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Team Strength</div>
                <div className="text-lg font-semibold" data-testid="text-team-strength">
                  {result.matchFactors.teamStrengthDiff > 0 ? "+" : ""}{result.matchFactors.teamStrengthDiff.toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {result.matchFactors.teamStrengthDiff > 0 ? "Batting advantage" : "Bowling advantage"}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Venue Impact</div>
                <div className="text-lg font-semibold" data-testid="text-venue-impact">
                  {result.matchFactors.venueAdvantage > 0 ? "+" : ""}{result.matchFactors.venueAdvantage.toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {result.matchFactors.venueAdvantage > 0 ? "Batting friendly" : "Bowling friendly"}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Weather Effect</div>
                <div className="text-lg font-semibold" data-testid="text-weather-effect">
                  {result.matchFactors.weatherImpact > 0 ? "+" : ""}{result.matchFactors.weatherImpact.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground">
                  {Math.abs(result.matchFactors.weatherImpact) < 2 ? "Minimal impact" : 
                   result.matchFactors.weatherImpact > 0 ? "Favorable" : "Challenging"}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Toss Advantage</div>
                <div className="text-lg font-semibold" data-testid="text-toss-advantage">
                  {result.matchFactors.tossAdvantage ? "Yes" : "No"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {result.matchFactors.tossAdvantage ? "Won by batting team" : "Won by bowling team"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Importance Chart */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Key Factors Influence</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="feature" 
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar 
                  dataKey="importance" 
                  fill="hsl(var(--primary))"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}