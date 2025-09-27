import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Cloud, Clock, Trophy, Coins } from "lucide-react";
import { predictionInputSchema, type PredictionInput, IPL_TEAMS, IPL_VENUES, WEATHER_CONDITIONS, DAY_NIGHT_OPTIONS, MATCH_TYPES, TOSS_DECISIONS } from "@shared/schema";

interface PredictionFormProps {
  onSubmit: (data: PredictionInput) => void;
  isLoading?: boolean;
}

export function PredictionForm({ onSubmit, isLoading = false }: PredictionFormProps) {
  const form = useForm<PredictionInput>({
    resolver: zodResolver(predictionInputSchema),
    defaultValues: {
      innings: 1,
      weather: "Clear",
      dayNight: "Night", 
      matchType: "League",
      tossDecision: "Bat",
      overs: 20,
      wickets: 3
    }
  });

  const watchedValues = form.watch();

  const handleSubmit = (data: PredictionInput) => {
    console.log("Prediction form submitted:", data);
    onSubmit(data);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Match Setup
        </CardTitle>
        <CardDescription>
          Configure match conditions to predict the final score
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Teams Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="battingTeam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Batting Team
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-batting-team">
                          <SelectValue placeholder="Select batting team" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {IPL_TEAMS.map((team) => (
                          <SelectItem key={team} value={team}>
                            {team}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bowlingTeam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Bowling Team
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-bowling-team">
                          <SelectValue placeholder="Select bowling team" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {IPL_TEAMS.filter(team => team !== watchedValues.battingTeam).map((team) => (
                          <SelectItem key={team} value={team}>
                            {team}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Venue and Conditions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Venue
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-venue">
                          <SelectValue placeholder="Select venue" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {IPL_VENUES.map((venue) => (
                          <SelectItem key={venue} value={venue}>
                            {venue}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weather"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Cloud className="h-4 w-4" />
                      Weather
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-weather">
                          <SelectValue placeholder="Select weather" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {WEATHER_CONDITIONS.map((weather) => (
                          <SelectItem key={weather} value={weather}>
                            {weather}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Match Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="dayNight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Time
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-day-night">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DAY_NIGHT_OPTIONS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="matchType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Trophy className="h-4 w-4" />
                      Match Type
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-match-type">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MATCH_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="innings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Innings</FormLabel>
                    <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger data-testid="select-innings">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1st Innings</SelectItem>
                        <SelectItem value="2">2nd Innings</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Toss Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tossWinner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Coins className="h-4 w-4" />
                      Toss Winner
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-toss-winner">
                          <SelectValue placeholder="Select toss winner" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[watchedValues.battingTeam, watchedValues.bowlingTeam].filter(Boolean).map((team) => (
                          <SelectItem key={team} value={team!}>
                            {team}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tossDecision"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Toss Decision</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-toss-decision">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TOSS_DECISIONS.map((decision) => (
                          <SelectItem key={decision} value={decision}>
                            {decision}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Match Progress */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="overs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      <span>Overs: {field.value}</span>
                      <Badge variant="secondary">{field.value === 20 ? "Full Match" : `${field.value} overs`}</Badge>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        min={5}
                        max={20}
                        step={0.1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        data-testid="slider-overs"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wickets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      <span>Wickets Lost: {field.value}</span>
                      <Badge variant={field.value >= 7 ? "destructive" : field.value >= 4 ? "secondary" : "default"}>
                        {field.value}/10
                      </Badge>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={10}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        data-testid="slider-wickets"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
              data-testid="button-predict"
            >
              {isLoading ? "Predicting..." : "Predict Score"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}