import { Trophy, Activity } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Trophy className="h-8 w-8 text-[hsl(45_100%_50%)]" />
              <Activity className="absolute -bottom-1 -right-1 h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">IPL Score Predictor</h1>
              <p className="text-xs text-muted-foreground">ML-Powered Cricket Analytics</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}