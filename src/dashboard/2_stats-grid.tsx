import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Footprints,
  Droplets,
  BedDouble,
  Target,
  AlertCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Step 1: Data ke liye ek type define karein
interface WeeklyStats {
  totalSteps: number;
  totalSleep: number;
  totalWater: number;
  progressPercentage: number;
}

export function StatsGrid() {
  // Step 2: State variables banayein (data, loading, error)
  const [stats, setStats] = useState<WeeklyStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // src/components/dashboard/2_stats-grid.tsx

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication failed. Please log in.");
        setIsLoading(false);
        return;
      }

      try {
        // FIX 1: Route ko 'stats' mein badla gaya
        console.log("Fetching weekly stats...");
        const response = await axios.get(
          "http://localhost:3000/api/progress/weekly", // 'weekly' se 'stats' kiya
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // console.log("Weekly stats fetched:", response.data);

        // FIX 2: Check karein ki 'weeklyStats' key maujood hai ya nahi
        // Agar backend se { weeklyStats: {...} } aa raha hai, to yeh line sahi hai
        if (response.data) {
          setStats(response.data);
          console.log("Weekly stats set in state:", response.data);
        } else {
          // Agar backend se seedhe { totalSteps: ... } aa raha hai, to yeh line use hogi
          console.log(
            "Data does not have 'weeklyStats' key, using response.data directly."
          );
          setStats(response.data);
        }
      } catch (err) {
        setError("Failed to load weekly stats.");
        console.log (err); // Error ko console mein log karein taaki aap dekh sakein
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    if (stats) {
      console.log("Stats updated:", stats);
    }
  }, [stats]);

  // ... (baki component ka code waise hi rahega)

  // Step 4: Loading state handle karein
  if (isLoading) {
    return <StatsGridSkeleton />;
  }

  // Step 5: Error state handle karein
  if (error || !stats) {
    return (
      <div className="text-red-500 flex items-center gap-2 p-4 border border-red-200 bg-red-50 rounded-md">
        <AlertCircle className="h-4 w-4" />
        <p>{error || "Could not load stats."}</p>
      </div>
    );
  }

  // Step 6: Fetched data se dynamically cards banayein
  const statCardsData = [
    {
      title: "Total Steps",
      value: stats.totalSteps.toLocaleString(), // Example: 55,000
      period: "This week",
      icon: <Footprints className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Water Intake",
      value: `${stats.totalWater}L`, // Example: 22L
      period: "This week",
      icon: <Droplets className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Sleep Hours",
      value: `${stats.totalSleep}h`, // Example: 45h
      period: "This week",
      icon: <BedDouble className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Weekly Goal",
      value: `${stats.progressPercentage}%`, // Example: 85%
      period: "7-day completion",
      icon: <Target className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCardsData.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

// Is component mein koi change nahi chahiye
interface StatCardProps {
  title: string;
  value: string;
  period: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, period, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{period}</p>
      </CardContent>
    </Card>
  );
}

// Loading state ke liye ek skeleton component
function StatsGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-3 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
