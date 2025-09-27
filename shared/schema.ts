import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// IPL Teams enum for consistency
export const IPL_TEAMS = [
  "Mumbai Indians",
  "Chennai Super Kings", 
  "Royal Challengers Bangalore",
  "Delhi Capitals",
  "Kolkata Knight Riders",
  "Punjab Kings",
  "Rajasthan Royals",
  "Sunrisers Hyderabad",
  "Gujarat Titans",
  "Lucknow Super Giants"
] as const;

// IPL Venues
export const IPL_VENUES = [
  "Wankhede Stadium",
  "M. A. Chidambaram Stadium",
  "M. Chinnaswamy Stadium", 
  "Arun Jaitley Stadium",
  "Eden Gardens",
  "PCA Stadium",
  "Sawai Mansingh Stadium",
  "Rajiv Gandhi International Stadium",
  "Narendra Modi Stadium",
  "Ekana Cricket Stadium"
] as const;

export const WEATHER_CONDITIONS = ["Clear", "Overcast", "Humid", "Windy"] as const;
export const DAY_NIGHT_OPTIONS = ["Day", "Day-Night", "Night"] as const;
export const MATCH_TYPES = ["League", "Qualifier", "Eliminator", "Final"] as const;
export const TOSS_DECISIONS = ["Bat", "Bowl"] as const;
export const VENUE_TYPES = ["batting_friendly", "bowling_friendly", "balanced"] as const;

// Prediction input schema
export const predictionInputSchema = z.object({
  battingTeam: z.enum(IPL_TEAMS),
  bowlingTeam: z.enum(IPL_TEAMS),
  venue: z.enum(IPL_VENUES),
  innings: z.number().min(1).max(2).default(1),
  weather: z.enum(WEATHER_CONDITIONS).default("Clear"),
  dayNight: z.enum(DAY_NIGHT_OPTIONS).default("Night"),
  matchType: z.enum(MATCH_TYPES).default("League"),
  tossWinner: z.enum(IPL_TEAMS).optional(),
  tossDecision: z.enum(TOSS_DECISIONS).default("Bat"),
  overs: z.number().min(5).max(20).default(20),
  wickets: z.number().min(0).max(10).default(3)
});

// Prediction result schema
export const predictionResultSchema = z.object({
  predictedScore: z.number(),
  confidence: z.number().min(0).max(1),
  featureImportance: z.record(z.string(), z.number()),
  matchFactors: z.object({
    teamStrengthDiff: z.number(),
    venueAdvantage: z.number(),
    weatherImpact: z.number(),
    tossAdvantage: z.boolean()
  })
});

export type PredictionInput = z.infer<typeof predictionInputSchema>;
export type PredictionResult = z.infer<typeof predictionResultSchema>;

// Keep existing user schema for auth if needed later
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;